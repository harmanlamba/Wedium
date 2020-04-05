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
        private WediumContext _wediumContext;

        public UserService(WediumContext wediumContext)
        {
            _wediumContext = wediumContext;
        }

        public async Task<UserDto> Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {
            //await Task.Delay(1);
            return this.AuthenticateUser(payload);
        }

        private UserDto AuthenticateUser(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {
            User user = _wediumContext.User
                .Where(x => x.Email == payload.Email)
                .FirstOrDefault();

            if(user == null)
            {
                user = new User()
                {
                    FirstName = payload.GivenName,
                    Email = payload.Email,
                    Username = payload.Email,
                    LastName = payload.FamilyName,
                    Password = "test"
                };
                _wediumContext.User.Add(user);
                _wediumContext.SaveChanges();
            }

            return UserMapper.ToDto(user); 
        }

        public UserDto GetUser(string email)
        {
            return UserMapper.ToDto(_wediumContext.User
                .First(u => u.Email == email));
        }
    }
}
