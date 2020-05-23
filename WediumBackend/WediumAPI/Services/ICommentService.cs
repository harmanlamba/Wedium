using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface ICommentService
    {
        /// <summary>
        /// Check if the comment exists given the commentId
        /// </summary>
        /// <param name="commentId"></param> The id of the comment for which the check has to be performed.
        /// <returns></returns>
        public bool CheckExists(int commentId);

        /// <summary>
        /// Get the comments associated for a post given the postId
        /// </summary>
        /// <param name="postId"></param> The id of thepost for which the comments are being retrieved
        /// <param name="userId"></param> Optional Parameter, the userId of the user requesting the comments for the post
        /// <returns></returns>
        public IEnumerable<CommentDto> GetCommentsForPost(int postId, int? userId);
        public (CommentDto commentDto, PostDto post) CreateComment(CommentDto commentDto, int? userId);
    }
}
