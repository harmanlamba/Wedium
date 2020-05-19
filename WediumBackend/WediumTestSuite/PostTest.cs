using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
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
        private DbContextOptions<WediumContext> _wediumContextOptions;
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

            _wediumContextOptions = _testServer.getWediumContextOptions();
        }

        [Test]
        public async Task GetPostInvalidPostId()
        {
            HttpClient client = _testServer.CreateClient();

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/Post/Get?after_id=0");
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public async Task GetPostValidLimitInputTest()
        {
            HttpClient client = _testServer.CreateClient();

            int limit1 = 2;

            HttpResponseMessage limit1Response = await client.GetAsync(_apiEndpoint + $"api/Post/Get?limit={limit1}");
            Assert.AreEqual(HttpStatusCode.OK, limit1Response.StatusCode);

            List<PostDto> limit1Content = await limit1Response.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(limit1, limit1Content.Count);

            int limit2 = 3;

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

            int limit = 2;

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
        
        [Test]
        public async Task GetSingularPostWithID()
        {
            HttpClient client = _testServer.CreateClient(1);

            Post post;
            WikiArticle wikiArticle;
            PostType postType;

            using (WediumContext db = new WediumContext(_wediumContextOptions))
            {
                post = db.Post.Where(p => p.PostId == 1).Include(p => p.WikiArticle).Include(p => p.PostType).First<Post>();
                wikiArticle = post.WikiArticle;
                postType = post.PostType;
            }

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + $"api/Post/get/{post.PostId}");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            PostDto postDto = await response.Content.ReadAsAsync<PostDto>();
            Assert.AreEqual(post.Title, postDto.Title);
            Assert.AreEqual(wikiArticle.ArticleTitle, postDto.ArticleTitle);
            Assert.AreEqual(postType.PostTypeValue, postDto.PostType);
            Assert.AreEqual(wikiArticle.Url, postDto.ArticleUrl);
            Assert.AreEqual(wikiArticle.ArticleImageUrl, postDto.ArticleImageUrl);
            Assert.AreEqual(wikiArticle.ArticleBody, postDto.ArticleBody);
        }

        [Test]
        public async Task GetPostWithInvalidPostId()
        {
            HttpClient client = _testServer.CreateClient();
            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + $"api/Post/get/-1");

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public async Task CreatePostSuccessfully()
        {
            HttpClient client = _testServer.CreateClient(1);

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
        public async Task CreatePostWhenWikiArticleNotFound()
        {
            HttpClient client = _testServer.CreateClient(1);

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
        public async Task CreatePostWhenWikiArticleThumbnailNotFound()
        {
            HttpClient client = _testServer.CreateClient(1);

            PostDto postDto = new PostDto
            {
                ArticleTitle = "Hello",
                Title = "Hello? Where's my thumbnail",
                PostType = "Culture",
                ArticleUrl = "https://en.wikipedia.org/wiki/Hello"
            };

            HttpResponseMessage response = await client.PostAsync(_apiEndpoint + "api/Post/Post", postDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
        }

        [Test]
        public async Task DeletePostSuccessfully()
        {
            Post post;
            using (WediumContext db = new WediumContext(_wediumContextOptions))
            {
                post = db.Post.First();
            }

            HttpClient client = _testServer.CreateClient(post.UserId);

            HttpResponseMessage response = await client.DeleteAsync(_apiEndpoint + "api/Post/Delete/1");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            HttpResponseMessage getResponse = await client.GetAsync(_apiEndpoint + $"api/Post/get/1");
            Assert.AreEqual(HttpStatusCode.NotFound, getResponse.StatusCode);
        }

        [Test]
        public async Task DeletePostUnauthorized()
        {
            Post post;
            using (WediumContext db = new WediumContext(_wediumContextOptions))
            {
                post = db.Post.First();
            }

            HttpClient client = _testServer.CreateClient();
            HttpResponseMessage response = await client.DeleteAsync(_apiEndpoint + "api/Post/Delete/1");
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            _testServer.AuthenticateClient(client, 1);
            HttpResponseMessage successfulResponse = await client.DeleteAsync(_apiEndpoint + "api/Post/Delete/1");
            Assert.AreEqual(HttpStatusCode.OK, successfulResponse.StatusCode);
        }
    }
}
