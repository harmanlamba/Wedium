using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto.WikiMedia;

namespace WediumAPI.Services
{
    public interface IWikiMediaApiService
    {
        /// <summary>
        /// Get the Wikipedia articles body content given the title of the Wikipedia article
        /// </summary>
        /// <param name="title"></param> The title of the Wikipedia article for which the content has to be retrieved
        /// <returns></returns>
        Task<WikiMediaMetaDataDto> GetWikiContentAsync(string title);

        /// <summary>
        /// Get the thumbnail photo assoicated to the Wikipedia Article given its Title
        /// </summary>
        /// <param name="title"></param> The title of the Wikipedia article for which the thumbnail has to be retrieved
        /// <returns></returns>
        Task<string> GetWikiThumbnailAsync(string title);

        /// <summary>
        /// Get the latest date of the Article 
        /// </summary>
        /// <param name="title"></param> The title of the Wikipedia article for which the latest date is retrieved
        /// <returns></returns>
        Task<DateTime> GetWikiLatestDateAsync(string title);
    }
}
