using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WediumAPI.Dto;
using System.Net;
using WediumAPI.Exceptions;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class WikiMediaApiService : IWikiMediaApiService
    {
        private readonly WediumContext _db;
        private readonly string WIKIMEDIA_GET_CONTENT_ENDPOINT; 

        public WikiMediaApiService(WediumContext wediumContext)
        {
            _db = wediumContext;
            
            Settings settings = _db.Settings
                .First(s => s.Key == "WIKIMEDIA_GET_CONTENT_ENDPOINT");

            WIKIMEDIA_GET_CONTENT_ENDPOINT = settings.Value;
        }

        public async Task<(WikiMediaDto content, long pageId)> GetWikiContentAsync(string title)
        {
            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.GetAsync($"{WIKIMEDIA_GET_CONTENT_ENDPOINT}&titles={title}");

            WikiMediaDto wikiMediaDto = await response.Content.ReadAsAsync<WikiMediaDto>();

            long pageId;
            try
            {
                pageId = wikiMediaDto.Query.Pages.First().PageId;
            }
            catch (NullReferenceException)
            {
                throw new WikiArticleNotFoundException();
            }

            if (pageId == 0 || string.IsNullOrEmpty(wikiMediaDto.Query.Pages.First().Extract) || response.StatusCode != HttpStatusCode.OK)
            {
                throw new WikiArticleNotFoundException();
            }

            return (wikiMediaDto, pageId);
        }
    }
}
