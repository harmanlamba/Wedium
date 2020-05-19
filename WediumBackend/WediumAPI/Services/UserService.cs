using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class UserService : IUserService
    {
        private readonly WediumContext _wediumContext;

        public UserService(WediumContext wediumContext)
        {
            _wediumContext = wediumContext;
        }

        public UserDto Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload, out int userId)
        {
            User user = _wediumContext.User
                .FirstOrDefault(x => x.Email == payload.Email);

            if (user == null)
            {
                user = new User()
                {
                    FirstName = payload.GivenName,
                    Email = payload.Email,
                    LastName = payload.FamilyName
                };

                 _wediumContext.User.Add(user);
                _wediumContext.SaveChanges();
            }

            userId = user.UserId;

            UserDto userDto = UserMapper.ToDto(user);
            userDto.PictureUri = payload.Picture;

            return userDto;
        }

        public UserDto GetUser(int userId)
        {
            return UserMapper.ToDto(_wediumContext.User
                .First(u => u.UserId == userId));
        }
    }
}
