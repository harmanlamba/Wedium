using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WediumAPI.Helper;

namespace WediumTestSuite.Helper
{
    public static class MockJWTTokenResolver
    {
        public static string CreateMockJWTToken(int authenticationClaimValue)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            if (!EnvironmentSettingsResolver.TryGetJWTSecretFromEnvironment(out string jwtSecret))
            {
                jwtSecret = AppSettingsResolver.GetSetting<string>("Options:JwtSecret");
            }

            byte[] key = Encoding.ASCII.GetBytes(jwtSecret);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, authenticationClaimValue.ToString())
                }),

                // Changed expiry from original value to reduce active claims for security
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
