using System;
using System.Collections.Generic;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface IPostService
    {
        /// <summary>
        /// Gets a list of posts in chronological order (without duplicates), starting at the newest Post
        /// </summary>
        /// <param name="userId"></param> Optional Parameter: The id of the user requesting the posts
        /// <param name="search"></param> Optional Parameter: If present, only posts with a title, description or wikipedia article title which contain the 
        /// search string, or posts with wikipedia url which equals the search string will be returned
        /// <param name="postType"></param> Optional Parameter: If present, only posts with a PostType equal to the inputted string will be returned
        /// <param name="limit"></param> Optional Parameter: The number of posts to retrieve (default: uses GetPostDefaultLimit value in appsettings.json)
        /// <param name="afterId"></param> Optional Parameter: The last retrieved PostId (default: will start chronological stream at newest post)
        /// <returns></returns> 
        public IEnumerable<PostDto> GetPosts(int? userId, string search, string postType, int? limit, int? afterId);

        /// <summary>
        /// Get a singular post matching the post id provided
        /// </summary>
        /// <param name="postId"></param> The id of the post that has to be retrieved
        /// <param name="userId"></param> Optional Parameter: The userId of the user making the request
        /// <returns></returns>
        public PostDto GetPost(int postId, int? userId);

        /// <summary>
        /// Check to validate that the post exists
        /// </summary>
        /// <param name="postId"></param> The postId of the post for which the check has to be conducted
        /// <returns></returns>
        public bool CheckExists(int postId);

        /// <summary>
        /// Create a post given the user who made the post and the postDto (content of the post)
        /// </summary>
        /// <param name="postDto"></param> The postDto object that contains the details of the post to create the post
        /// <param name="userId"></param> The id of the user creating the post
        /// <returns></returns>
        public PostDto CreatePost(PostDto postDto, int userId);

        /// <summary>
        /// Deleteing the post given the postId of the post and the userId of the user
        /// </summary>
        /// <param name="post"></param> The post id for the post that has to be deleted
        /// <param name="userId"></param> The id of the user making the request to delete the post
        public void DeletePost(int post, int userId);

        /// <summary>
        /// Get a list of created posts by the user, given thier userId
        /// </summary>
        /// <param name="userId"></param> The Id of the user for which their created posts are retrieved.
        /// <param name="limit"></param> Optional Parameter: The number of posts to retrieve (default: uses GetPostDefaultLimit value in appsettings.json)
        /// <param name="afterId"></param> Optional Parameter: The last retrieved PostId (default: will start chronological stream at newest post)
        /// <returns></returns>
        public IEnumerable<PostDto> GetCreatedPosts(int userId, int? limit, int? afterId);
    }
}
