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
        private readonly Options _options;

        public PostService(WediumContext wediumContext, IOptions<Options> options)
        {
            _db = wediumContext;
            _options = options.Value;
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
    }
}
