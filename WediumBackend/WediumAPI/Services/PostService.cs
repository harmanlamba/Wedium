using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WediumAPI.Dto;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class PostService : IPostService
    {
        private readonly WediumContext _db;

        public PostService(WediumContext wediumContext)
        {
            _db = wediumContext;
        }

        public IEnumerable<PostDto> GetPosts()
        {
            var x = _db.Post
                .Include(u => u.User)
                .Include(p => p.PostType)
                .Include(w => w.WikiArticle)
                .ToList();

            return PostMapper.ToDto(x);
        }
    }
}
