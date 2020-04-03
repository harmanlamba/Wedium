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
            string connectionString = SettingsResolver.GetConnectionString();
            var optionsBuilder = new DbContextOptionsBuilder<WediumContext>();
            optionsBuilder.UseSqlServer(connectionString);
            return new WediumContext(optionsBuilder.Options);
        }
    }
}
