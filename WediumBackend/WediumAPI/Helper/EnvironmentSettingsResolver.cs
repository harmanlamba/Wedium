using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Helper
{
    public static class EnvironmentSettingsResolver
    {
        private static readonly string DB_CONNECTION_ENVIRONMENT_VARIABLE = "DB_CONNECTION_STRING";
        private static readonly string JWT_SECRET = "JWT_SECRET";

        public static bool TryGetEnvironmentVariable(string key, out string value)
        {
            value = Environment.GetEnvironmentVariable(key);

            return value != null;
        }

        public static bool TryGetConnectionStringFromEnvironment(out string value)
        {            
            return TryGetEnvironmentVariable(DB_CONNECTION_ENVIRONMENT_VARIABLE, out value);
        }  
        
        public static bool TryGetJWTSecretFromEnvironment(out string value)
        {
            return TryGetEnvironmentVariable(JWT_SECRET, out value);
        }

    }
}
