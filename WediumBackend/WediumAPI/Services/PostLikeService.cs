using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class PostLikeService : IPostLikeService
    {
        private readonly WediumContext _db;
        private readonly IPostService _postService;

        public PostLikeService(WediumContext wediumContext, IPostService postService)
        {
            _db = wediumContext;
            _postService = postService;
        }

        public void CreatePostLike(int userId, int postId)
        {
            if (!_postService.CheckExists(postId))
            {
                throw new KeyNotFoundException();
            }

            if (_db.PostLike.Any(p => p.UserId == userId && p.PostId == postId))
            {
                throw new ArgumentException();
            }

            PostLike postLike = new PostLike
            {
                PostId = postId,
                UserId = userId,
                Date = DateTime.Now
            };

            _db.PostLike.Add(postLike);
            _db.SaveChanges();
        }

        public void DeletePostLike(int userId, int postId)
        {
            if (!_postService.CheckExists(postId))
            {
                throw new KeyNotFoundException();
            }

            PostLike postLike = _db.PostLike
                .FirstOrDefault(p => p.UserId == userId && p.PostId == postId);
            
            if (postLike == null)
            {
                throw new ArgumentException();
            }

            _db.PostLike.Remove(postLike);
            _db.SaveChanges();
        }
    }
}
