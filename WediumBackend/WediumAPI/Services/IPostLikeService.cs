using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface IPostLikeService
    {
        /// <summary>
        /// Create a post like for a post given the userId and the postId
        /// </summary>
        /// <param name="userId"></param> The userId of the user who wants to like the post
        /// <param name="postId"></param> The id of the post that has to be liked
        public void CreatePostLike(int userId, int postId);

        /// <summary>
        /// Remove a post like for a post given the userId and the postId
        /// </summary>
        /// <param name="userId"></param> The userId of the user who wants to unlike the post
        /// <param name="postId"></param> The id of the post that has to be unliked
        public void DeletePostLike(int userId, int postId);

        /// <summary>
        /// Get a list of posts that are liked by a user
        /// </summary>
        /// <param name="userId"></param> The userId of the user requesting the posts
        /// <param name="limit"></param> The amount of posts that should be retrieved
        /// <param name="afterId"></param> The id after which the posts should be retrieved
        /// <returns></returns>
        public IEnumerable<PostDto> GetLikedPosts(int userId, int? limit, int? afterId);
    }
}
