using Newtonsoft.Json.Linq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    class PostTest
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
        public async Task GetPost_PostIdInvalid()
        {
            HttpClient client = _testServer.CreateClient();

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/Post/Get?after_id=0");
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public async Task GetPostValidLimitInputTest()
        {
            HttpClient client = _testServer.CreateClient();

            int limit1 = 5;

            HttpResponseMessage limit1Response = await client.GetAsync(_apiEndpoint + $"api/Post/Get?limit={limit1}");
            Assert.AreEqual(HttpStatusCode.OK, limit1Response.StatusCode);

            List<PostDto> limit1Content = await limit1Response.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(limit1, limit1Content.Count);

            int limit2 = 10;

            HttpResponseMessage limit2Response = await client.GetAsync(_apiEndpoint + $"api/Post/Get?limit={limit2}");
            Assert.AreEqual(HttpStatusCode.OK, limit2Response.StatusCode);

            List<PostDto> limit2Content = await limit2Response.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(limit2, limit2Content.Count);
        }

        [Test]
        public async Task GetPostNegativeLimitInputTest()
        {
            HttpClient client = _testServer.CreateClient();

            int limit1 = -1;

            HttpResponseMessage limit1Response = await client.GetAsync(_apiEndpoint + $"api/Post/Get?limit={limit1}");
            Assert.AreEqual(HttpStatusCode.BadRequest, limit1Response.StatusCode);
        }

        [Test]
        public async Task GetPostAfterIdInputTest()
        {
            HttpClient client = _testServer.CreateClient();

            int limit = 5;

            HttpResponseMessage firstBatchResponse = await client.GetAsync(_apiEndpoint + $"api/Post/Get?limit={limit}");
            Assert.AreEqual(HttpStatusCode.OK, firstBatchResponse.StatusCode);

            List<PostDto> firstBatchContent = await firstBatchResponse.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(limit, firstBatchContent.Count);

            int postId = firstBatchContent[limit - 2].PostId;

            HttpResponseMessage secondBatchResponse = await client.GetAsync(_apiEndpoint + $"api/Post/Get/?limit={limit}&after_id={postId}");
            Assert.AreEqual(HttpStatusCode.OK, secondBatchResponse.StatusCode);

            List<PostDto> secondBatchContent = await secondBatchResponse.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(limit, secondBatchContent.Count);
            Assert.AreEqual(firstBatchContent[limit - 1].PostId, secondBatchContent[0].PostId);
        }
    }
}
