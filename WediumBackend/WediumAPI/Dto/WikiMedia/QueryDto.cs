using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Dto
{
    public class QueryDto
    {
        public IEnumerable<PagesDto> Pages { get; set; }
        public IEnumerable<NormalizedDto> Normalized { get; set; }
    }
}
