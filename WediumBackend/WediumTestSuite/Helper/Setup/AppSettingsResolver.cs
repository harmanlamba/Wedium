using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace WediumTestSuite.Helper
{
    class AppSettingsResolver
    {
        public static IConfiguration InitConfiguration()
        {
            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            return config;
        }

        public static string GetAPIEndpointURI()
        {
            return InitConfiguration().GetSection("APIEndpointURI").Value;
        }

        public static string GetJwtSecret()
        {
            return InitConfiguration().GetSection("Options:JwtSecret").Value;
        }
    }
}
