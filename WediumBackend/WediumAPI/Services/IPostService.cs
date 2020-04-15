using System;
using System.Collections.Generic;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface IPostService
    {
        public IEnumerable<PostDto> GetPosts(int? limit, int? afterId);
        public bool CheckExists(int postId);
    }
}
