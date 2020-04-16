using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WediumAPI.Dto;
using System.Net;
using WediumAPI.Exceptions;
using WediumAPI.Models;
using WediumAPI.Dto.WikiMedia;

namespace WediumAPI.Services
{
    public class WikiMediaApiService : IWikiMediaApiService
    {
        private readonly WediumContext _db;
        private readonly string WIKIMEDIA_GET_CONTENT_ENDPOINT;
        private readonly string WIKIMEDIA_GET_THUMBNAIL_ENDPOINT;
        private readonly string WIKIMEDIA_GET_LATEST_DATE_ENDPOINT;

        public WikiMediaApiService(WediumContext wediumContext)
        {
            _db = wediumContext;
            
            Settings GetContentSettings = _db.Settings
                .First(s => s.Key == "WIKIMEDIA_GET_CONTENT_ENDPOINT");

            Settings GetThumbnailSettings = _db.Settings
                .First(s => s.Key == "WIKIMEDIA_GET_THUMBNAIL_ENDPOINT");

            Settings GetLatestDateSettings = _db.Settings
                .First(s => s.Key == "WIKIMEDIA_GET_LATEST_DATE_ENDPOINT");

            WIKIMEDIA_GET_CONTENT_ENDPOINT = GetContentSettings.Value;
            WIKIMEDIA_GET_THUMBNAIL_ENDPOINT = GetThumbnailSettings.Value;
            WIKIMEDIA_GET_LATEST_DATE_ENDPOINT = GetLatestDateSettings.Value;
        }
        public async Task<WikiMediaContentDto> GetWikiContentAsync(string title)
        {
            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.GetAsync($"{WIKIMEDIA_GET_CONTENT_ENDPOINT}&titles={title}");

            WikiMediaContentDto wikiMediaDto = await response.Content.ReadAsAsync<WikiMediaContentDto>();

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

            return wikiMediaDto;
        }

        public async Task<string> GetWikiThumbnailAsync(string title)
        {
            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.GetAsync($"{WIKIMEDIA_GET_THUMBNAIL_ENDPOINT}&titles={title}");

            WikiMediaMetaDataDto wikiMediaThumbnailDto = await response.Content.ReadAsAsync<WikiMediaMetaDataDto>();

            if (wikiMediaThumbnailDto.Query.Pages.First().Value.Thumbnail == null)
            {
                throw new WikiArticleThumbnailNotFoundException();
            } 
            else if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new WikiArticleNotFoundException();
            }

            return wikiMediaThumbnailDto.Query.Pages.First().Value.Thumbnail.Source;
        }

        public async Task<DateTime> GetWikiLatestDateAsync(string title)
        {
            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.GetAsync($"{WIKIMEDIA_GET_LATEST_DATE_ENDPOINT}&titles={title}");

            WikiMediaMetaDataDto wikiMediaDateDto = await response.Content.ReadAsAsync<WikiMediaMetaDataDto>();

            if (wikiMediaDateDto.Query.Pages.First().Value.Revisions == null)
            {
                throw new WikiArticleNotFoundException();
            }

            return wikiMediaDateDto.Query.Pages.First().Value.Revisions.First().Timestamp;
        }
    }
}
