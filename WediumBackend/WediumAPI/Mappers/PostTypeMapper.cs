using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.DTO;
using WediumAPI.Models;

namespace WediumAPI.Mappers
{
    public class PostTypeMapper
    {
        public static PostTypeDTO ToDTO(PostType postType)
        {
            return new PostTypeDTO
            {
                PostType = postType.PostTypeValue
            };
        }

        public static IEnumerable<PostTypeDTO> ToDTO(IEnumerable<PostType> postTypeList)
        {
            return postTypeList.Select(p => ToDTO(p));
        }
    }
}
