using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Services
{
    public interface ICommentLikeService
    {
        public void CreateCommentLike(int userId, int commentId);
        public void DeleteCommentLike(int userId, int commentId);
    }
}
