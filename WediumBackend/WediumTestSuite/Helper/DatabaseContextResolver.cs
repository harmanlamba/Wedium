using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using WediumAPI.Helper;
using WediumAPI.Models;

namespace WediumTestSuite.Helper
{
    public class DatabaseContextResolver
    {
        public static IConfiguration InitConfiguration()
        {
            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            return config;
        }

        public static bool TryGetSetting(string setting, out string value)
        {
            value = InitConfiguration().GetSection(setting).Value;

            return value != null;
        }

        public static WediumContext GetDatabaseContext()
        {
            if (!EnvironmentSettingsResolver.TryGetConnectionStringFromEnvironment(out string connectionString))
            {
                IConfiguration config = InitConfiguration();
                connectionString = config.GetConnectionString(config.GetValue<string>("DatabaseName"));
            }

            DbContextOptionsBuilder<WediumContext> optionsBuilder = new DbContextOptionsBuilder<WediumContext>()
                .UseSqlServer(connectionString);
            
            return new WediumContext(optionsBuilder.Options);
        }
    }
}
