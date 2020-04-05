using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class PostTypeService : IPostTypeService
    {
        private readonly WediumContext _db;

        public PostTypeService(WediumContext wediumContext)
        {
            _db = wediumContext;
        }

        public IEnumerable<PostTypeDto> GetPostTypes()
        {
            return PostTypeMapper.ToDto(_db.PostType.ToList());
        }
    }
}
