using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Services
{
    public interface IPostLikeService
    {
        public void CreatePostLike(int userId, int postId);
        public void DeletePostLike(int userId, int postId);
    }
}
