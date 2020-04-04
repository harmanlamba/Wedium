using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private WediumContext _db;

        public AuthenticationService(WediumContext db)
        {
            _db = db;
        }

        public async Task<User> Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {
            //await Task.Delay(1);
            return this.AuthenticateUser(payload);
        }


        private User AuthenticateUser(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {
            User user = _db.User.Where(x => x.Email == payload.Email).FirstOrDefault();

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
                _db.User.Add(user);
                _db.SaveChanges();
            }

            return user; 
        }


    }
}
