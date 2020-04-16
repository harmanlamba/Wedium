using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Dto.WikiMedia
{
    public class QueryMetaDataDto
    {
        public Dictionary<long,PagesDto> Pages { get; set; }
    }
}
