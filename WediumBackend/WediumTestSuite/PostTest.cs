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
        private int _batchSize;

        [OneTimeSetUp]
        public void Setup()
        {
            _testServer = new TestServerHandler();

            _apiEndpoint = AppSettingsResolver.GetSetting<string>("APIEndpointURI");
            _batchSize = AppSettingsResolver.GetSetting<int>("Options:GetPostBatchSize");
        }

        [Test]
        public async Task GetPost_PostIdInvalid()
        {
            HttpClient client = _testServer.CreateClient();

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/Post/Get/0");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            
            List<PostDto> content = await response.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(0, content.Count);
        }

        [Test]
        public async Task GetPost_NoPostIdInput()
        {
            HttpClient client = _testServer.CreateClient();

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/Post/Get");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            List<PostDto> content = await response.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(_batchSize, content.Count);
        }

        [Test]
        public async Task GetPost_GetSecondBatch()
        {
            HttpClient client = _testServer.CreateClient();

            HttpResponseMessage firstBatchResponse = await client.GetAsync(_apiEndpoint + "api/Post/Get");
            Assert.AreEqual(HttpStatusCode.OK, firstBatchResponse.StatusCode);

            List<PostDto> firstBatchContent = await firstBatchResponse.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(_batchSize, firstBatchContent.Count);

            int postId = firstBatchContent[_batchSize - 1].PostId;

            HttpResponseMessage secondBatchResponse = await client.GetAsync(_apiEndpoint + "api/Post/Get/" + postId);
            Assert.AreEqual(HttpStatusCode.OK, secondBatchResponse.StatusCode);

            List<PostDto> secondBatchContent = await secondBatchResponse.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(_batchSize, secondBatchContent.Count);
        }
    }
}
