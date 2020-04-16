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

        private readonly string WIKIARTICLE_DEFAULT_THUMBNAIL;

        public PostService(WediumContext wediumContext, IWikiMediaApiService wikiMediaApiService, IOptions<Options> options)
        {
            _db = wediumContext;
            _wikiMediaApiService = wikiMediaApiService;
            _options = options.Value;

            Settings GetDefaultThumbnailSettings = _db.Settings
                .First(s => s.Key == "WIKIARTICLE_DEFAULT_THUMBNAIL");

            WIKIARTICLE_DEFAULT_THUMBNAIL = GetDefaultThumbnailSettings.Value;
        }

        public IEnumerable<PostDto> GetPosts(int? limit, int? afterId)
        {
            IQueryable<Post> postListQuery;

            if (afterId == null)
            {
                postListQuery = _db.Post
                    .OrderByDescending(d => d.Date);
            }
            else
            {
                // Check post with after_id as the id value exists
                Post post = _db.Post
                    .FirstOrDefault(p => p.PostId == afterId);

                if (post == null)
                {
                    throw new PostNotFoundException();
                }

                // Gets all posts in chronological order after after_id
                postListQuery = _db.Post
                    .Where(d => d.Date < post.Date)
                    .OrderByDescending(d => d.Date);
            }                
            
            List<Post> postList = postListQuery
                .Take(limit.HasValue ? limit.Value : _options.GetPostDefaultLimit)
                .Include(u => u.User)
                .Include(p => p.PostType)
                .Include(w => w.WikiArticle)
                .Include(pl => pl.PostLike)
                .ToList();

            IEnumerable<PostDto> postDtoList = PostMapper.ToDto(postList).ToList();
            
            if (postDtoList.Any())
            {
                PostDto lastPost = postDtoList.Last();
                lastPost.HasMore = _db.Post.Any(p => p.Date < lastPost.Date);
            }

            return postDtoList;
        }

        public bool CheckExists(int postId)
        {
            return _db.Post
                .Any(p => p.PostId == postId);
        }

        public void CreatePost(PostDto postDto, int userId)
        {
            WikiArticle wikiArticle;
            string articleImageUrl = null;

            try
            {
                articleImageUrl = _wikiMediaApiService.GetWikiThumbnailAsync(postDto.ArticleTitle).Result;
            }
            catch (AggregateException e)
            {
                e.Handle((x) =>
                {
                    if (x is WikiArticleThumbnailNotFoundException)
                    {
                        articleImageUrl = WIKIARTICLE_DEFAULT_THUMBNAIL;
                        return true;
                    }
                    return false;
                });
            }

            wikiArticle = new WikiArticle()
            {
                Url = postDto.ArticleUrl,
                ArticleDate = _wikiMediaApiService.GetWikiLatestDateAsync(postDto.ArticleTitle).Result,
                ArticleBody = _wikiMediaApiService.GetWikiContentAsync(postDto.ArticleTitle).Result.Query.Pages.First().Extract,
                ArticleTitle = postDto.ArticleTitle,
                ArticleImageUrl = articleImageUrl
            };
           
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
