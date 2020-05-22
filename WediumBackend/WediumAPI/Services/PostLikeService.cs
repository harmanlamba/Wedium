using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Exceptions;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class PostLikeService : IPostLikeService
    {
        private readonly WediumContext _db;
        private readonly IPostService _postService;
        private readonly Options _options;

        public PostLikeService(WediumContext wediumContext, IPostService postService, IOptions<Options> options)
        {
            _db = wediumContext;
            _postService = postService;
            _options = options.Value;
        }

        public void CreatePostLike(int userId, int postId)
        {
            if (!_postService.CheckExists(postId))
            {
                throw new PostNotFoundException();
            }

            if (_db.PostLike.Any(p => p.UserId == userId && p.PostId == postId))
            {
                throw new PostLikeAlreadyExistsException();
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
                throw new PostNotFoundException();
            }

            PostLike postLike = _db.PostLike
                .FirstOrDefault(p => p.UserId == userId && p.PostId == postId);
            
            if (postLike == null)
            {
                throw new PostLikeNotFoundException();
            }

            _db.PostLike.Remove(postLike);
            _db.SaveChanges();
        }

        public IEnumerable<PostDto> GetLikedPosts(int userId, int? limit, int? afterId)
        {
            IQueryable<PostLike> postLikeListQuery = _db.PostLike
                .Where(f => f.UserId == userId)
                .OrderByDescending(f => f.Date);

            // Applies afterId query if present
            if (afterId.HasValue)
            {
                // Check post with after_id as the id value exists
                PostLike queryInputPost = postLikeListQuery
                    .FirstOrDefault(p => p.PostId == afterId);

                if (queryInputPost == null)
                {
                    throw new PostNotFoundException();
                }

                // Gets all posts in the order they were postliked after after_id (newest to oldest)
                postLikeListQuery = postLikeListQuery
                    .Where(p => p.Date < queryInputPost.Date);
            }

            // Adds 1 to limit to efficiently calculate hasMore of last element in list
            int limitApplied = (limit.HasValue ? limit.Value : _options.GetPostDefaultLimit) + 1;

            IQueryable<Post> likedPosts = postLikeListQuery
                .Take(limitApplied)
                .Include(f => f.Post)
                .Include(f => f.Post.WikiArticle)
                .Select(f => f.Post);

            likedPosts.Select(p => p.PostType).Load();
            likedPosts.Select(p => p.User).Load();
            likedPosts.Select(p => p.Favourite).Load();
            likedPosts.Select(p => p.PostLike).Load();

            IEnumerable<PostDto> postDtoList = PostMapper.ToDto(likedPosts, userId).ToList();

            if (postDtoList.Count() == limitApplied)
            {
                postDtoList = postDtoList.SkipLast(1);
            }
            else if (postDtoList.Any())
            {
                PostDto lastPost = postDtoList.Last();
                lastPost.HasMore = false;
            }

            return postDtoList;
        }
    }
}
