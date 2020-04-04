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

            DatabaseContextResolver.TryGetSetting("APIEndpointURI", out _apiEndpoint);
        }

        [Test]
        public async Task GetPost_PostIdInvalid()
        {
            HttpClient client = _testServer.CreateClient();

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/Post/Get/0");
            JArray content = JArray.Parse(await response.Content.ReadAsStringAsync());

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(0, content.Count);
        }

        [Test]
        public async Task GetPost_NoPostIdInput()
        {
            HttpClient client = _testServer.CreateClient();

            DatabaseContextResolver.TryGetSetting("GetPostBatchSize", out string GetPostBatchSize);
            int batchSize = Int32.Parse(GetPostBatchSize);

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/Post/Get");
            JArray content = JArray.Parse(await response.Content.ReadAsStringAsync());

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(batchSize, content.Count);
        }

        [Test]
        public async Task GetPost_GetSecondBatch()
        {
            HttpClient client = _testServer.CreateClient();

            DatabaseContextResolver.TryGetSetting("GetPostBatchSize", out string GetPostBatchSize);
            int batchSize = Int32.Parse(GetPostBatchSize);

            HttpResponseMessage firstBatchResponse = await client.GetAsync(_apiEndpoint + "api/Post/Get");
            JArray firstBatchContent = JArray.Parse(await firstBatchResponse.Content.ReadAsStringAsync());

            Assert.AreEqual(HttpStatusCode.OK, firstBatchResponse.StatusCode);
            Assert.AreEqual(Int32.Parse(GetPostBatchSize), firstBatchContent.Count);

            int postId = firstBatchContent[batchSize - 1].Value<int>("PostId");

            HttpResponseMessage secondBatchResponse = await client.GetAsync(_apiEndpoint + "api/Post/Get/" + postId);
            JArray secondBatchContent = JArray.Parse(await firstBatchResponse.Content.ReadAsStringAsync());

            Assert.AreEqual(HttpStatusCode.OK, secondBatchResponse.StatusCode);
            Assert.AreEqual(batchSize, secondBatchContent.Count);
        }
    }
}
