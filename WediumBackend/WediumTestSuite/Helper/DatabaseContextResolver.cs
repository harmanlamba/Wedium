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
            if (!EnvironmentSettingsResolver.TryGetConnectionStringFromEnvironment(out string connectionString))
            {
                connectionString = AppSettingsResolver.InitConfiguration().GetConnectionString("WediumDatabase");
            }

            DbContextOptionsBuilder<WediumContext> optionsBuilder = new DbContextOptionsBuilder<WediumContext>()
                .UseSqlServer(connectionString);
            
            return new WediumContext(optionsBuilder.Options);
        }
    }
}
