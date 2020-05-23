using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface IFavouriteService
    {
        /// <summary>
        /// Mark a post as favourite given the userId and the postId
        /// </summary>
        /// <param name="userId"></param> The id of the user, for which the post will be favourtied
        /// <param name="postId"></param> The id of the post that has to be favourtied
        public void CreateFavourite(int userId, int postId);

        /// <summary>
        /// Un-mark/delete a post as favourite given the userId and the postId
        /// </summary>
        /// <param name="userId"></param> The id of the user, for which the post will be favourtied
        /// <param name="postId"></param> The id of the post that has to be favourtied
        public void DeleteFavourite(int userId, int postId);

        /// <summary>
        /// Get a list of favourited posts of the user given their userId
        /// </summary>
        /// <param name="userId"></param> The id of the user
        /// <param name="limit"></param> Optional parameter, the amount of posts that should be retrieved
        /// <param name="afterId"></param> Optional parameter, the posts that should be retrieved after the given id
        /// <returns></returns>
        public IEnumerable<PostDto> GetFavouritedPosts(int userId, int? limit, int? afterId);
    }
}
