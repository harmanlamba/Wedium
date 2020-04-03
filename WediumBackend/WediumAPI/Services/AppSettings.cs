using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Services
{
    public class AppSettings
    {
        public static AppSettings appSettings { get; set; }
        public string JwtSecret { get; set; }
        public string JwtEmailEncryption { get; set; }
        public string GoogleClientId { get; set; }
        public string GoogleClientSecret { get; set; }
    }
}
