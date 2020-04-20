using System;
using System.Collections.Generic;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface IPostService
    {
        public IEnumerable<PostDto> GetPosts(int? userId, string title, string postType, int? limit, int? afterId);
        public bool CheckExists(int postId);
        public void CreatePost(PostDto postDto, int userId);
        public void DeletePost(int post, int userId);
    }
}
