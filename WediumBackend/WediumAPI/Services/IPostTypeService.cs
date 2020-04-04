using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.DTO;

namespace WediumAPI.Services
{
    public interface IPostTypeService
    {
        public IEnumerable<PostTypeDTO> GetPostTypes();
    }
}
