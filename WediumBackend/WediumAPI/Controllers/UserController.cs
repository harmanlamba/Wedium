using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WediumAPI.Dto;
using WediumAPI.Services;

namespace WediumAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _service;
        private Options _options;
  
        public UserController(IUserService service, IOptions<Options> options)
        {
            _service = service;
            _options = options.Value;
        }

        [AllowAnonymous]
        [HttpPost("google")]
        public ActionResult<UserDto> Google([FromBody]OneTimeTokenDto oneTimeTokenDto)
        {
            UserDto user;

            try
            {
                GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(oneTimeTokenDto.TokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
                user = _service.Authenticate(payload, out int userId);

                user.JWTToken = CreateToken(userId);
            }
            catch (Exception)
            {
                return new UnauthorizedResult();
            }

            return Ok(user);
        }

        //This method is used for JWT Token Testing, can leave for now, have to remove for production.
        //[Authorize]
        //[HttpGet]
        //public ActionResult<UserDto> Get()
        //{
        //    ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
        //    int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
        //    UserDto user = _service.GetUser(userId);

        //    return Ok(user);
        //}

        private string CreateToken(int userId)
        {
            // Creates jwt token for user based on user's email is the primary key of the user.
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_options.JwtSecret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
