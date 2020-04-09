using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Exceptions;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class FavouriteService : IFavouriteService
    {
        private readonly WediumContext _db;
        private readonly IPostService _postService;

        public FavouriteService(WediumContext wediumContext, IPostService postService)
        {
            _db = wediumContext;
            _postService = postService;
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
    }
}
