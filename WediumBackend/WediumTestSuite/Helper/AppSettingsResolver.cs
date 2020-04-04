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

        public static string GetSetting(string setting)
        {
            return InitConfiguration().GetSection(setting).Value;
        }
    }
}
