using System;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Models;
using WediumAPI.Service;

namespace WediumAPI.Services
{
    public class UserStatsService : IUserStatsService
    {
        private readonly WediumContext _wediumContext;

        public UserStatsService(WediumContext wediumContext)
        {
            _wediumContext = wediumContext;
        }

        public UserStatsDto GetUserStats(int userId)
        {
            int createPostCount = _wediumContext.Post.Count(p => p.UserId == userId);
            int favouritePostCount = _wediumContext.Favourite.Count(p => p.UserId == userId);
            int postLikeCount = _wediumContext.PostLike.Count(p => p.UserId == userId);

            return new UserStatsDto
            {
                CreatePostCount = createPostCount,
                FavouritePostCount = favouritePostCount,
                PostLikeCount = postLikeCount
            };
        }
    }
}
