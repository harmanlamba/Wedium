﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WediumAPI.Dto;
using WediumAPI.Models;
using WediumAPI.Services;

namespace WediumAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public readonly WediumContext _db;
        private IAuthenticationService _authService;
        private Options _options;
  
        public AuthController(WediumContext db, IOptions<Options> options, IAuthenticationService authService)
        {
            _db = db;
            _authService = authService;
            _options = options.Value;
        }

        [AllowAnonymous]
        [HttpPost("google")]
        public async Task<IActionResult> Google([FromBody]OneTimeTokenDto oneTimeTokenDto)
        {
            var payload = GoogleJsonWebSignature.ValidateAsync(oneTimeTokenDto.tokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
            User user = await _authService.Authenticate(payload);

            return Ok(new
            {
                JWTToken = CreateToken(user)
            });
            
            //Add error checking
        }

        [HttpGet]
        public ActionResult Get()
        {

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            int userID = Int32.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
            User user = _db.User.FirstOrDefault(u => u.UserId == userID);


            return Ok(new
            {
                user.Username,
                user.FirstName,
                user.LastName,
                user.Email
            });
        }


        private string CreateToken(User user)
        {
            // Creates jwt token for user based on user's username as username is the primary key of the user.
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_options.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }


    }
}