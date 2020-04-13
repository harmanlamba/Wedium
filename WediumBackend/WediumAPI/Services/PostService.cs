using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WediumAPI.Dto;
using WediumAPI.Exceptions;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class PostService : IPostService
    {
        private readonly WediumContext _db;
        private readonly IWikiMediaApiService _wikiMediaApiService; 
        private readonly Options _options;

        public PostService(WediumContext wediumContext, IWikiMediaApiService wikiMediaApiService, IOptions<Options> options)
        {
            _db = wediumContext;
            _wikiMediaApiService = wikiMediaApiService;
            _options = options.Value;
        }

        public IEnumerable<PostDto> GetPosts(int? postId)
        {
            IOrderedQueryable<Post> postListQuery;

            if (postId == null)
            {
                postListQuery = _db.Post
                    .OrderByDescending(d => d.Date);
            }
            else
            {
                Post post = _db.Post
                    .FirstOrDefault(p => p.PostId == postId);

                if (post == null)
                {
                    return new List<PostDto>();
                }

                postListQuery = _db.Post
                    .Where(d => d.Date < post.Date)
                    .OrderByDescending(d => d.Date);
            }

            List<Post> postList = postListQuery
                .Take(_options.GetPostBatchSize)
                .Include(u => u.User)
                .Include(p => p.PostType)
                .Include(w => w.WikiArticle)
                .ToList();

            return PostMapper.ToDto(postList);
        }

        public bool CheckExists(int postId)
        {
            return _db.Post
                .Any(p => p.PostId == postId);
        }

        public void CreatePost(PostDto postDto, int userId)
        {
            WikiArticle wikiArticle;

            try
            {
                wikiArticle = new WikiArticle()
                {
                    Url = postDto.ArticleUrl,
                    ArticleDate = _wikiMediaApiService.GetWikiLatestDateAsync(postDto.ArticleTitle).Result,
                    ArticleBody = _wikiMediaApiService.GetWikiContentAsync(postDto.ArticleTitle).Result.Query.Pages.First().Extract,
                    ArticleTitle = postDto.ArticleTitle,
                    ArticleImageUrl = _wikiMediaApiService.GetWikiThumbnailAsync(postDto.ArticleTitle).Result
                };
            } catch (ArgumentNullException)
            {
                throw new WikiArticleNotFoundException();
            }
           
            _db.WikiArticle.Add(wikiArticle);
            _db.SaveChanges();

            PostType postType = _db.PostType.First(pt => pt.PostTypeValue == postDto.PostType);
            Post post = new Post()
            {
                UserId = userId,
                Date = DateTime.Now,
                WikiArticleId = wikiArticle.WikiArticleId,
                Title = postDto.Title,
                Description = postDto.Description,
                PostTypeId = postType.PostTypeId
            };

            _db.Post.Add(post);
            _db.SaveChanges();
        }

        public bool DeletePost(PostDto postDto, int userId)
        {
            Post post = _db.Post.First(p => p.PostId == postDto.PostId);

            if (post.UserId == userId)
            {
                _db.Post.Remove(post);
                _db.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
