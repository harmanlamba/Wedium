using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto.WikiMedia;

namespace WediumAPI.Services
{
    public interface IWikiMediaApiService
    {
        Task<WikiMediaMetaDataDto> GetWikiContentAsync(string title);
        Task<string> GetWikiThumbnailAsync(string title);
        Task<DateTime> GetWikiLatestDateAsync(string title);
    }
}
