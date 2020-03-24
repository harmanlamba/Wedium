using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class Settings
    {
        public int SettingsId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
