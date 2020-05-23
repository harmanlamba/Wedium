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
        /// <summary>
        /// Authenticate the user GoogleToken with Google servers 
        /// </summary>
        /// <param name="payload"></param> GoogleToken which is provided when the users login to the Google Portal
        /// <param name="userId"></param> The id of the user that has been generated in Wedium
        /// <returns></returns>
        public UserDto Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload, out int userId);

        /// <summary>
        /// Get the user given the userId
        /// </summary>
        /// <param name="userId"></param> The id of the user that has to be retrieved
        /// <returns></returns>
        public UserDto GetUser(int userId);
    }
}
