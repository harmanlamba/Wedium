using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Models;

namespace WediumAPI.Mappers
{
    public class PostTypeMapper
    {
        public static PostTypeDTO ToDto(PostType postType)
        {
            return new PostTypeDTO
            {
                PostType = postType.PostTypeValue
            };
        }

        public static IEnumerable<PostTypeDTO> ToDto(IEnumerable<PostType> postTypeList)
        {
            return postTypeList.Select(p => ToDto(p));
        }
    }
}
