using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.DTO;
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

        public IEnumerable<PostTypeDTO> GetPostTypes()
        {
            return PostTypeMapper.ToDTO(_db.PostType.ToList());
        }
    }
}
