using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Models;

namespace WediumAPI.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToDto(User user)
        {
            return new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName
            };
        }
    }
}
