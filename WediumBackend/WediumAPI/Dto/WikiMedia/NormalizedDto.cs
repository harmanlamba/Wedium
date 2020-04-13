using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Dto
{
    public class GetContentNormalizedDto
    {
        public bool FromEncoded { get; set; }
        public string From { get; set; }
        public string To { get; set; }
    }
}
