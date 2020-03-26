using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using WediumAPI.Models;

namespace WediumTestSuite.Helper
{
    class DatabaseContextResolver
    {
        private static readonly string GITHUB_ENVIRONMENT_VARIABLE = "GITHUB_ACTIONS";
        private static readonly string DB_CONNECTION_ENVIRONMENT_VARIABLE = "DB_CONNECTION_STRING";
        private static readonly string DATABASE_NAME = "WediumDatabase";

        public static IConfiguration InitConfiguration()
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
            return config;
        }

        public static WediumContext GetDatabaseContext()
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

            var optionsBuilder = new DbContextOptionsBuilder<WediumContext>();
            optionsBuilder.UseSqlServer(connectionString);
            return new WediumContext(optionsBuilder.Options);
        }
    }
}
