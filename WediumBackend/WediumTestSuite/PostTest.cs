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
        private WediumContext _db;

        private string _apiEndpoint;

        private readonly int USER_ID = 139;
        private readonly int POST_ID = 70;
        private readonly int WIKI_ARTICLE_ID = 73;
        private readonly string ARTICLE_IMAGE_URL_COMMAND = "SELECT ArticleImageUrl, ArticleBody FROM WDM.[WikiArticle] where WikiArticleId = ";

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            _db = DatabaseContextResolver.GetDatabaseContext();

            _apiEndpoint = AppSettingsResolver.GetSetting<string>("APIEndpointURI");
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
            HttpClient client = _testServer.CreateClient(USER_ID);
            Task<(HttpStatusCode, PostDto)> response = CreatePost(client);

            Assert.AreEqual(HttpStatusCode.Created, response.Result.Item1);

            Post post = _db.Post.First(p => p.Title.Equals(response.Result.Item2.Title) && p.UserId == USER_ID);

            HttpResponseMessage httpResponse = await client.GetAsync(_apiEndpoint + $"api/Post/get/{post.PostId}");
            Assert.AreEqual(HttpStatusCode.OK, httpResponse.StatusCode);

            PostDto postDto = await httpResponse.Content.ReadAsAsync<PostDto>();
            Assert.AreEqual(response.Result.Item2.Title, postDto.Title);
            Assert.AreEqual(response.Result.Item2.ArticleTitle, postDto.ArticleTitle);
            Assert.AreEqual(response.Result.Item2.PostType, postDto.PostType);
            Assert.AreEqual(response.Result.Item2.ArticleUrl, postDto.ArticleUrl);

            //Deleting the Recently Created Post
            HttpStatusCode statuscode = await DeletePostHelper(response.Result.Item2, USER_ID);
            Assert.AreEqual(HttpStatusCode.OK, statuscode);
        }

        [Test]
        public async Task GetSingularPostWithIDCheckWikiArticleData()
        {
            HttpClient client = _testServer.CreateClient();
            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + $"api/Post/get/{POST_ID}");

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            PostDto postDto = await response.Content.ReadAsAsync<PostDto>();

            string ArticleImageUrl = "";
            string ArticleBody = "";

            using (SqlConnection connection = new SqlConnection(DatabaseContextResolver.GetConnectionString()))
            {
                SqlCommand command = new SqlCommand(ARTICLE_IMAGE_URL_COMMAND + WIKI_ARTICLE_ID, connection);
                connection.Open();
                SqlDataReader dr = command.ExecuteReader();

                if (dr.Read())
                {
                    ArticleImageUrl = (string)dr["ArticleImageUrl"];
                    ArticleBody = (string)dr["ArticleBody"];
                }
            }

            Assert.AreEqual(ArticleImageUrl, postDto.ArticleImageUrl);
            Assert.AreEqual(ArticleBody, postDto.ArticleBody);
        }

        [Test]
        public async Task GetPostWithInvalidPostId()
        {
            HttpClient client = _testServer.CreateClient();
            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + $"api/Post/get/-1");

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public async Task CreatePost_SuccessfulCreate()
        {
            HttpClient client = _testServer.CreateClient(USER_ID);
            Task<(HttpStatusCode,PostDto)> response = CreatePost(client);
            
            Assert.AreEqual(HttpStatusCode.Created, response.Result.Item1);

            //Deleting the Recently Created Post
            HttpStatusCode statuscode = await DeletePostHelper(response.Result.Item2, USER_ID);
            Assert.AreEqual(HttpStatusCode.OK, statuscode);
        }

        [Test]
        public async Task CreatePost_WikiArticleNotFound()
        {
            HttpClient client = _testServer.CreateClient(USER_ID);

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
            HttpClient client = _testServer.CreateClient(USER_ID);

            PostDto postDto = new PostDto
            {
                ArticleTitle = "Hello",
                Title = "Hello? Where's my thumbnail",
                PostType = "Culture",
                ArticleUrl = "https://en.wikipedia.org/wiki/Hello"
            };

            HttpResponseMessage response = await client.PostAsync(_apiEndpoint + "api/Post/Post", postDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

            // Deleting the Recently Created Post
            HttpStatusCode statuscode = await DeletePostHelper(postDto, USER_ID);
            Assert.AreEqual(HttpStatusCode.OK, statuscode);
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

            // Deleting the Recently Created Post
            HttpStatusCode statuscode = await DeletePostHelper(postDto, USER_ID);
            Assert.AreEqual(HttpStatusCode.OK, statuscode);
        }

        [Test]
        public async Task DeletePost_UnsuccessfulDelete()
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
            HttpStatusCode uncessfulStatusCode = await DeletePostHelper(postDto);
            Assert.AreEqual(HttpStatusCode.Unauthorized, uncessfulStatusCode);

            // Deleting the Recently Created Post Sucessfully
            HttpStatusCode statusCode = await DeletePostHelper(postDto, USER_ID);
            Assert.AreEqual(HttpStatusCode.OK, statusCode);
        }

        private async Task<HttpStatusCode> DeletePostHelper(PostDto postDto, int? userId = null)
        {
            if (userId == null)
            {
                return HttpStatusCode.Unauthorized;
            }

            HttpClient client = _testServer.CreateClient(userId);

            Post post = _db.Post.First(p => p.Title.Equals(postDto.Title) && p.UserId == userId);
            int wikiArticleId = post.WikiArticleId;

            HttpRequestMessage request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(_apiEndpoint + $"api/Post/Delete/{post.PostId}"),
            };

            HttpResponseMessage response = await client.SendAsync(request);

            RemoveWikiArticle(wikiArticleId);

            return response.StatusCode;
        }

        // Method usees manual SQl query to delete WikiArticle for testing purposes. 
        // Since we do not want to Cascade delete due to our FK relation
        // and buisness logic, EF Core is not able to delete the entities. 
        // Thus, manual SQL queries have to be used. 
        public void RemoveWikiArticle(int wikiArticleId)
        {
            string deleteCommand = "DELETE FROM WDM.[WikiArticle] where WikiArticleId =";
            
            using (SqlConnection connection = new SqlConnection(DatabaseContextResolver.GetConnectionString()))
            {
                SqlCommand command = new SqlCommand(deleteCommand + wikiArticleId, connection);
                connection.Open();
                command.BeginExecuteNonQuery();
            }
        }

        private async Task<(HttpStatusCode,PostDto)> CreatePost(HttpClient client)
        {
            PostDto postDto = new PostDto
            {
                ArticleTitle = "Bugatti",
                Title = "Bugatti or Shucatti",
                PostType = "Culture",
                ArticleUrl = "https://en.wikipedia.org/wiki/Bugatti"
            };

            HttpResponseMessage response = await client.PostAsync(_apiEndpoint + "api/Post/Post", postDto, new JsonMediaTypeFormatter());

            return (response.StatusCode,postDto);
        }
    }
}
