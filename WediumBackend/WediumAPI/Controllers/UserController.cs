using System;
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
using WediumAPI.Helper;
using WediumAPI.Service;
using WediumAPI.Services;

namespace WediumAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _service;
        private IUserStatsService _statsService;
        private Options _options;
  
        public UserController(IUserService service, IUserStatsService statsService, IOptions<Options> options)
        {
            _service = service;
            _statsService = statsService;
            _options = options.Value;
        }

        /// <summary>
        /// The endpoint posts the onetime token given by Google to return the UserDto which includes the 
        /// Jwt Token for subsequent requests.
        /// </summary>
        /// <param name="oneTimeTokenDto"></param> The user's onetime token provided by Google Login
        /// <returns></returns>Ok in the case that the Google Token was succesfully recieved.
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

        /// <summary>
        /// API endpoint supplies the UserDto of the user that made the request
        /// </summary>
        /// <returns></returns>Ok with the userDto in the body of the request
        [Authorize]
        [HttpGet]
        public ActionResult<UserDto> GetUserDto()
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
            UserDto user = _service.GetUser(userId);

            return Ok(user);
        }

        /// <summary>
        /// Returns a set of statistics about the User's activities on Wedium.
        /// </summary>
        /// <returns></returns> Ok with the stats of the user in the body of the request
        [Authorize]
        [HttpGet("Stats")]
        public ActionResult<UserStatsDto> GetUserStats()
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
            UserStatsDto user = _statsService.GetUserStats(userId);

            return Ok(user);
        }

        private string CreateToken(int userId)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            if (!EnvironmentSettingsResolver.TryGetJWTSecretFromEnvironment(out string jwtSecret))
            {
                jwtSecret = _options.JwtSecret;
            }

            byte[] key = Encoding.ASCII.GetBytes(jwtSecret);

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
