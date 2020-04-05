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
        public static PostTypeDto ToDto(PostType postType)
        {
            return new PostTypeDto
            {
                PostType = postType.PostTypeValue
            };
        }

        public static IEnumerable<PostTypeDto> ToDto(IEnumerable<PostType> postTypeList)
        {
            return postTypeList.Select(p => ToDto(p));
        }
    }
}
