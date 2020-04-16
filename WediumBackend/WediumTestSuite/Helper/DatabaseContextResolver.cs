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
        public static WediumContext GetDatabaseContext()
        {
            DbContextOptionsBuilder<WediumContext> optionsBuilder = new DbContextOptionsBuilder<WediumContext>()
                .UseSqlServer(GetConnectionString());
            
            return new WediumContext(optionsBuilder.Options);
        }

        public static string GetConnectionString()
        {
            if (!EnvironmentSettingsResolver.TryGetConnectionStringFromEnvironment(out string connectionString))
            {
                connectionString = AppSettingsResolver.InitConfiguration().GetConnectionString("WediumDatabase");
            }

            return connectionString;
        }
    }
}
