using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface IPostTypeService
    {
        /// <summary>
        /// Get the PostTypes that are currently present 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PostTypeDto> GetPostTypes();
    }
}
