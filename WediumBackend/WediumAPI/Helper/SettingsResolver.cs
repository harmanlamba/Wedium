using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Helper
{
    public static class SettingsResolver
    {
        private static readonly string GITHUB_ENVIRONMENT_VARIABLE = "GITHUB_ACTIONS";
        private static readonly string DB_CONNECTION_ENVIRONMENT_VARIABLE = "DB_CONNECTION_STRING";
        private static readonly string DATABASE_NAME = "WediumDatabase";

        private static IConfiguration InitConfiguration()
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            return config;
        }

        public static bool TryGetSetting(string setting, out string value)
        {
            var config = InitConfiguration();
            value = config.GetSection(setting).Value;

            return value != null;
        }

        public static string GetConnectionString()
        {
            string connectionString = String.Empty;

            if (Environment.GetEnvironmentVariable(GITHUB_ENVIRONMENT_VARIABLE) == null || Environment.GetEnvironmentVariable(GITHUB_ENVIRONMENT_VARIABLE).Equals("false"))
            {
                var config = InitConfiguration();
                connectionString = config.GetConnectionString(DATABASE_NAME);
            }
            else
            {
                connectionString = Environment.GetEnvironmentVariable(DB_CONNECTION_ENVIRONMENT_VARIABLE);
            }

            return connectionString;
        }
    }
}
