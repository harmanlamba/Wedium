using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Text;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    class FavouriteTest
    {
        private TestServerHandler _testServer;
        private string _apiEndpoint;

        [OneTimeSetUp]
        public void Setup()
        {
            _testServer = new TestServerHandler();

            _apiEndpoint = AppSettingsResolver.GetSetting<string>("APIEndpointURI");
        }

        [Test]
        public async Task FavouriteAndUnfavouritePostTest()
        {
            HttpClient client = _testServer.CreateClient(139);

            FavouriteDto postLikeDto = new FavouriteDto
            {
                PostId = 77
            };

            HttpResponseMessage createResponse = await client.PostAsync(_apiEndpoint + "api/favourite/post", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.Created, createResponse.StatusCode);

            HttpResponseMessage duplicateCreateResponse = await client.PostAsync(_apiEndpoint + "api/favourite/post", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.OK, duplicateCreateResponse.StatusCode);

            HttpResponseMessage deleteResponse = await client.PostAsync(_apiEndpoint + "api/favourite/delete", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.OK, deleteResponse.StatusCode);

            HttpResponseMessage duplicateDeleteResponse = await client.PostAsync(_apiEndpoint + "api/favourite/delete", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NoContent, duplicateDeleteResponse.StatusCode);
        }

        [Test]
        public async Task FavouriteInvalidPostIdTest()
        {
            HttpClient client = _testServer.CreateClient(139);

            FavouriteDto favouriteDto = new FavouriteDto
            {
                PostId = -1
            };

            HttpResponseMessage createResponse = await client.PostAsync(_apiEndpoint + "api/favourite/post", favouriteDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NotFound, createResponse.StatusCode);
        }

        [Test]
        public async Task RemoveFavouriteInvalidPostIdTest()
        {
            HttpClient client = _testServer.CreateClient(139);

            FavouriteDto favouriteDto= new FavouriteDto
            {
                PostId = -1
            };

            HttpResponseMessage duplicateDeleteResponse = await client.PostAsync(_apiEndpoint + "api/favourite/delete", favouriteDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NotFound, duplicateDeleteResponse.StatusCode);
        }
    }
}
