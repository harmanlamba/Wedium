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
        private IUserService _authService;
        private Options _options;
  
        public UserController(IUserService authService, IOptions<Options> options)
        {
            _authService = authService;
            _options = options.Value;
        }

        [AllowAnonymous]
        [HttpPost("google")]
        public async Task<IActionResult> Google([FromBody]OneTimeTokenDto oneTimeTokenDto)
        {
            var payload = GoogleJsonWebSignature.ValidateAsync(oneTimeTokenDto.tokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
            UserDto user = await _authService.Authenticate(payload);

            return Ok(new
            {
                JWTToken = CreateToken(user)
            });
        }

        [HttpGet]
        public ActionResult<UserDto> Get()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            string email = identity.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserDto user = _authService.GetUser(email);

            return Ok(user);
        }

        private string CreateToken(UserDto user)
        {
            // Creates jwt token for user based on user's email is the primary key of the user.
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_options.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Email.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
