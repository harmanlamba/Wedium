using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Text;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Models;
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    class PostTest
    {
        private TestServerHandler _testServer;
        private WediumContext _db;

        private string _apiEndpoint;
        private int _batchSize;
        private readonly int USER_ID = 139;

        [OneTimeSetUp]
        public void Setup()
        {
            _testServer = new TestServerHandler();
            _db = DatabaseContextResolver.GetDatabaseContext();

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

        [Test]
        public async Task CreatePost_SuccessfulCreate()
        {
            HttpClient client = _testServer.CreateClient(139);

            PostDto postDto = new PostDto
            {
                ArticleTitle = "Bugatti",
                Title = "Bugatti or Shucatti",
                PostType = "Culture",
                ArticleUrl = "https://en.wikipedia.org/wiki/Bugatti"
            };

            HttpResponseMessage response = await client.PostAsync(_apiEndpoint + "api/Post/Post", postDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
        }

        [Test]
        public async Task CreatePost_WikiArticleNotFound()
        {
            HttpClient client = _testServer.CreateClient(139);

            PostDto postDto = new PostDto
            {
                ArticleTitle = "This Wiki Article Does Not Exist",
                Title = "This Wiki Article is non-existent!",
                PostType = "Culture",
                ArticleUrl = "https://en.wikipedia.org/wiki/ThisWikiArticleDoesNotExist"
            };

            HttpResponseMessage response = await client.PostAsync(_apiEndpoint + "api/Post/Post", postDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public async Task CreatePost_WikiArticleThumbnailNotFound()
        {
            HttpClient client = _testServer.CreateClient(139);

            PostDto postDto = new PostDto
            {
                ArticleTitle = "Hello",
                Title = "Hello? Where's my thumbnail",
                PostType = "Culture",
                ArticleUrl = "https://en.wikipedia.org/wiki/Hello"
            };

            HttpResponseMessage response = await client.PostAsync(_apiEndpoint + "api/Post/Post", postDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.PartialContent, response.StatusCode);
        }

        [Test]
        public async Task DeletePost_SuccessfulDelete()
        {
            HttpClient client = _testServer.CreateClient(USER_ID);

            // Create post
            PostDto postDto = new PostDto
            {
                ArticleTitle = "Bugatti",
                Title = "Bugatti or Shucatti",
                PostType = "Culture",
                ArticleUrl = "https://en.wikipedia.org/wiki/Bugatti"
            };

            HttpResponseMessage response = await client.PostAsync(_apiEndpoint + "api/Post/Post", postDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

            // Delete unsuccessful 
            Post post = _db.Post.First(p => p.Title.Equals(postDto.Title) && p.UserId == USER_ID);
            PostDto postDtoDelete = new PostDto
            {
                PostId = post.PostId
            };

            HttpRequestMessage request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(_apiEndpoint + "api/Post/Delete"),
                Content = new StringContent(JsonConvert.SerializeObject(postDtoDelete), Encoding.UTF8, "application/json")
            };

            HttpResponseMessage responseDelete = await client.SendAsync(request);
            Assert.AreEqual(HttpStatusCode.OK, responseDelete.StatusCode);
        }

        [Test]
        public async Task DeletePost_UnsuccessfulDelete()
        {
            HttpClient authorizedClient = _testServer.CreateClient(USER_ID);
            HttpClient unauthorizedClient = _testServer.CreateClient();

            // Create post
            PostDto postDto = new PostDto
            {
                ArticleTitle = "Bugatti",
                Title = "Bugatti or Shucatti",
                PostType = "Culture",
                ArticleUrl = "https://en.wikipedia.org/wiki/Bugatti"
            };

            HttpResponseMessage response = await authorizedClient.PostAsync(_apiEndpoint + "api/Post/Post", postDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

            // Delete unsuccessful 
            Post post = _db.Post.First(p => p.Title.Equals(postDto.Title) && p.UserId == USER_ID);
            PostDto postDtoDelete = new PostDto
            {
                PostId = post.PostId
            };

            HttpRequestMessage request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(_apiEndpoint + "api/Post/Delete"),
                Content = new StringContent(JsonConvert.SerializeObject(postDtoDelete), Encoding.UTF8, "application/json")
            };

            HttpResponseMessage responseDeleteFail = await unauthorizedClient.SendAsync(request);
            Assert.AreEqual(HttpStatusCode.Unauthorized, responseDeleteFail.StatusCode);

            // Delete successfully
            HttpResponseMessage responseDeleteSuccess = await authorizedClient.SendAsync(request);
            Assert.AreEqual(HttpStatusCode.OK, responseDeleteSuccess.StatusCode);
        }
    }
}
