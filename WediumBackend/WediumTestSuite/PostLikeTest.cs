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
    class PostLikeTest
    {
        private TestServerHandler _testServer;
        private string _apiEndpoint;

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            _apiEndpoint = AppSettingsResolver.GetAPIEndpointURI();
        }

        [SetUp]
        public void Setup()
        {
            _testServer = new TestServerHandler();
        }

        [Test]
        public async Task LikingAndUnlikingPostTest()
        {
            HttpClient client = _testServer.CreateClient(2);

            PostLikeDto postLikeDto = new PostLikeDto
            {
                PostId = 1
            };

            HttpResponseMessage createResponse = await client.PostAsync(_apiEndpoint + "api/postLike/post", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.Created, createResponse.StatusCode);

            HttpResponseMessage duplicateCreateResponse = await client.PostAsync(_apiEndpoint + "api/postLike/post", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.OK, duplicateCreateResponse.StatusCode);

            HttpResponseMessage deleteResponse = await client.PostAsync(_apiEndpoint + "api/postLike/delete", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.OK, deleteResponse.StatusCode);

            HttpResponseMessage duplicateDeleteResponse = await client.PostAsync(_apiEndpoint + "api/postLike/delete", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NoContent, duplicateDeleteResponse.StatusCode);
        }

        [Test]
        public async Task LikeInvalidPostIdTest()
        {
            HttpClient client = _testServer.CreateClient(2);

            PostLikeDto postLikeDto = new PostLikeDto
            {
                PostId = -1
            };

            HttpResponseMessage createResponse = await client.PostAsync(_apiEndpoint + "api/postLike/post", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NotFound, createResponse.StatusCode);
        }

        [Test]
        public async Task UnlikeInvalidPostIdTest()
        {
            HttpClient client = _testServer.CreateClient(2);

            PostLikeDto postLikeDto = new PostLikeDto
            {
                PostId = -1
            };

            HttpResponseMessage duplicateDeleteResponse = await client.PostAsync(_apiEndpoint + "api/postLike/delete", postLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NotFound, duplicateDeleteResponse.StatusCode);
        }
    }
}
