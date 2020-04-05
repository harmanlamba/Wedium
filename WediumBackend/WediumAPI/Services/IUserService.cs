using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public interface IUserService
    {
        public Task<UserDto> Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload);
        public UserDto GetUser(string email);
    }
}
