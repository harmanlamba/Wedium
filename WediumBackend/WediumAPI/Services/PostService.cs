using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WediumAPI.Dto;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class PostService : IPostService
    {
        private readonly WediumContext _db;

        public PostService(WediumContext wediumContepostListQueryt)
        {
            _db = wediumContepostListQueryt;
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
                .Take(5)
                .Include(u => u.User)
                .Include(p => p.PostType)
                .Include(w => w.WikiArticle)
                .ToList();

            return PostMapper.ToDto(postList);
        }
    }
}
