using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WediumAPI.Dto;
using WediumAPI.Exceptions;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class FavouriteService : IFavouriteService
    {
        private readonly WediumContext _db;
        private readonly IPostService _postService;
        private readonly Options _options;

        public FavouriteService(WediumContext wediumContext, IPostService postService, IOptions<Options> options)
        {
            _db = wediumContext;
            _postService = postService;
            _options = options.Value;
        }

        public void CreateFavourite(int userId, int postId)
        {
            if (!_postService.CheckExists(postId))
            {
                throw new PostNotFoundException();
            }

            if (_db.Favourite.Any(p => p.UserId == userId && p.PostId == postId))
            {
                throw new FavouriteAlreadyExistsException();
            }

            Favourite favourite = new Favourite
            {
                PostId = postId,
                UserId = userId,
                Date = DateTime.Now
            };

            _db.Favourite.Add(favourite);
            _db.SaveChanges();
        }

        public void DeleteFavourite(int userId, int postId)
        {
            if (!_postService.CheckExists(postId))
            {
                throw new PostNotFoundException();
            }

            Favourite favourite = _db.Favourite
                .FirstOrDefault(p => p.UserId == userId && p.PostId == postId);

            if (favourite == null)
            {
                throw new FavouriteNotFoundException();
            }

            _db.Favourite.Remove(favourite);
            _db.SaveChanges();
        }

        public IEnumerable<PostDto> GetFavouritedPosts(int userId, int? limit, int? afterId)
        {
            IQueryable<Favourite> favouriteListQuery = _db.Favourite
                .Where(p => p.UserId == userId);

            // Applies afterId query if present
            if (afterId.HasValue)
            {
                // Check post with after_id as the id value exists
                Favourite queryInputPost = favouriteListQuery
                    .FirstOrDefault(p => p.PostId == afterId);

                if (queryInputPost == null)
                {
                    throw new PostNotFoundException(); //todo change to favourited post not found
                }

                // Gets all posts in the order they were favourited after after_id (newest to oldest)
                favouriteListQuery = favouriteListQuery
                    .Where(p => p.Date < queryInputPost.Date);
            }

            // Adds 1 to limit to efficiently calculate hasMore of last element in list
            int limitApplied = (limit.HasValue ? limit.Value : _options.GetPostDefaultLimit) + 1;

            List<int> orderedFavouritedPostIds = favouriteListQuery
                .Take(limitApplied)
                .OrderByDescending(p => p.Date)
                .Select(p => p.PostId)
                .ToList();

            IEnumerable<Post> posts = _db.Post
                .Where(p => orderedFavouritedPostIds.Contains(p.PostId))
                .Include(p => p.PostType)
                .Include(p => p.WikiArticle)
                .Include(p => p.User)
                .Include(p => p.PostLike)
                .Include(p => p.Favourite)
                .AsEnumerable();

            IEnumerable<Post> orderedPosts = (from id in orderedFavouritedPostIds
                                              join post in posts
                                              on id equals post.PostId
                                              select post);

            IEnumerable<PostDto> postDtoList = PostMapper.ToDto(orderedPosts.ToList(), userId).ToList();


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
