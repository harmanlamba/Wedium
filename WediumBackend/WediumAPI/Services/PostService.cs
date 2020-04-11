using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WediumAPI.Dto;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class PostService : IPostService
    {
        private readonly WediumContext _db;
        private readonly Options _options;

        public PostService(WediumContext wediumContext, IOptions<Options> options)
        {
            _db = wediumContext;
            _options = options.Value;
        }

        public IEnumerable<PostDto> GetPosts(int? limit, int? after_id)
        {
            IQueryable<Post> postListQuery;

            if (after_id == null)
            {
                postListQuery = _db.Post
                    .OrderByDescending(d => d.Date);
            }
            else
            {
                Post post = _db.Post
                    .FirstOrDefault(p => p.PostId == after_id);

                if (post == null)
                {
                    return new List<PostDto>();
                }

                postListQuery = _db.Post
                    .Where(d => d.Date < post.Date)
                    .OrderByDescending(d => d.Date);
            }

            if (limit != null)
            {
                postListQuery = postListQuery.Take(limit.Value);
            }

            List<Post> postList = postListQuery
                .Include(u => u.User)
                .Include(p => p.PostType)
                .Include(w => w.WikiArticle)
                .ToList();

            IEnumerable<PostDto> postDtoList = PostMapper.ToDto(postList).ToList();
            
            if (postDtoList.Any())
            {
                PostDto lastPost = postDtoList.Last();

                postDtoList.Last().HasMore = _db.Post.Any(p => p.Date < lastPost.Date);
            }

            return postDtoList;
        }

        public bool CheckExists(int postId)
        {
            return _db.Post
                .Any(p => p.PostId == postId);
        }
    }
}
