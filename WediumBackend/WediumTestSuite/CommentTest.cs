using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
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
    public class CommentTest
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
        public async Task GetCommentsTestInvalidPostId()
        {
            HttpClient client = _testServer.CreateClient();

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/Comment/Get/-1");

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public async Task GetCommentsForPostWithNoComments()
        {
            HttpClient client = _testServer.CreateClient();

            // Test post with no comments
            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/Comment/Get/2");
            IEnumerable<CommentDto> comments = await response.Content.ReadAsAsync<IEnumerable<CommentDto>>();

            Assert.NotNull(comments);
            Assert.AreEqual(0, comments.Count());
        }

        [Test]
        public async Task GetCommentsForPostWithComment()
        {
            HttpClient client = _testServer.CreateClient(139);

            Comment comment;
            using (WediumContext db = new WediumContext(_wediumContextOptions))
            {
                comment = db.Comment.First();
            }

            // Test post with single comment
            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + $"api/Comment/Get/{comment.PostId}");
            IEnumerable<CommentDto> responseComments = await response.Content.ReadAsAsync<IEnumerable<CommentDto>>();

            Assert.NotNull(responseComments);
            Assert.AreEqual(1, responseComments.Count());
            Assert.AreEqual(comment.PostId, responseComments.First().PostId);
            Assert.AreEqual(comment.CommentId, responseComments.First().CommentId);
            Assert.AreEqual(comment.UserId, responseComments.First().UserId);
            Assert.AreEqual(comment.Body, responseComments.First().Body);
            Assert.AreEqual(comment.ParentCommentId, responseComments.First().ParentCommentId);
        }

        [Test]
        public async Task CreateComment()
        {
            // Create comments 
            CommentDto commentDto = new CommentDto
            {
                PostId = 2,
                UserId = 1,
                ParentCommentId = 1,
                Body = "Test comment 2!",
                CommentTypeId = 1,
            };

            HttpClient client = _testServer.CreateClient(1);

            HttpResponseMessage responseCreate = await client.PostAsync(_apiEndpoint + $"api/Comment/Post/", commentDto, new JsonMediaTypeFormatter());
            int commentId = await responseCreate.Content.ReadAsAsync<int>();

            Assert.AreEqual(HttpStatusCode.Created, responseCreate.StatusCode);
            Assert.AreEqual($"/post/Nature/2/TitleTest2", responseCreate.Headers.Location.ToString());
        }
    }
}
