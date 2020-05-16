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

        public static T GetSetting<T>(string key)
        {
            return (T)Convert.ChangeType(InitConfiguration().GetSection(key).Value, typeof(T));
        }
    }
}
