using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto.WikiMedia;

namespace WediumAPI.Dto
{
    public class PagesDto
    {
        public long PageId { get; set; }
        public int NS { get; set; }
        public string Title { get; set; }
        public string Extract { get; set; }
        public ThumbnailDto Thumbnail {get;set;}
        public string PageImage { get; set; }
        public IEnumerable<RevisionsDto> Revisions { get; set; }
    }
}
