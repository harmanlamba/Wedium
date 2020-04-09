using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public void AddFavourite(int userId, int postId)
        {
            if (!_postService.CheckExists(postId))
            {
                throw new KeyNotFoundException();
            }

            if (_db.Favourite.Any(p => p.UserId == userId && p.PostId == postId))
            {
                throw new ArgumentException();
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

        public void RemoveFavourite(int userId, int postId)
        {
            if (!_postService.CheckExists(postId))
            {
                throw new KeyNotFoundException();
            }

            Favourite favourite = _db.Favourite
                .FirstOrDefault(p => p.UserId == userId && p.PostId == postId);

            if (favourite == null)
            {
                throw new ArgumentException();
            }

            _db.Favourite.Remove(favourite);
            _db.SaveChanges();
        }
    }
}
