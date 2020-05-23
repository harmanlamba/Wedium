using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Services
{
    public interface ICommentLikeService
    {
        /// <summary>
        /// Create a comment like for a comment given the userId and the commentId of the comment
        /// </summary>
        /// <param name="userId"></param> The userId of the userId wanting to like the comment
        /// <param name="commentId"></param> The commentId of the comment that has to be like
        public void CreateCommentLike(int userId, int commentId);

        /// <summary>
        /// Delete a comment like for a comment given the userId and the commentId of the comment
        /// </summary>
        /// <param name="userId"></param> The userId of the userId wanting to like the comment
        /// <param name="commentId"></param> The commentId of the comment that has to be like
        public void DeleteCommentLike(int userId, int commentId);
    }
}
