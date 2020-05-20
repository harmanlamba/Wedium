using System;
using System.Collections.Generic;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface IPostService
    {
        public IEnumerable<PostDto> GetPosts(int? userId, string search, string postType, int? limit, int? afterId);
        public PostDto GetPost(int postId, int? userId);
        public bool CheckExists(int postId);
        public PostDto CreatePost(PostDto postDto, int userId);
        public void DeletePost(int post, int userId);
        public IEnumerable<PostDto> GetCreatedPosts(int userId, int? limit, int? afterId);
    }
}
