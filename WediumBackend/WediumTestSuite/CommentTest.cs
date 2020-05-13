using Microsoft.Data.SqlClient;
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
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    public class CommentTest
    {
        private TestServerHandler _testServer;
        private string _apiEndpoint;

        private readonly int POST_ID = 70;
        private readonly string POST_TYPE = "Technology";
        private readonly string POST_TITLE = "Best type of engineering all time?";

        [OneTimeSetUp]
        public void Setup()
        {
            _testServer = new TestServerHandler();

            _apiEndpoint = AppSettingsResolver.GetSetting<string>("APIEndpointURI");
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
            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/Comment/Get/69");
            IEnumerable<CommentDto> comments = await response.Content.ReadAsAsync<IEnumerable<CommentDto>>();

            Assert.NotNull(comments);
            Assert.AreEqual(0, comments.Count());
        }

        [Test]
        public async Task GetCommentsForPostWithComment()
        {
            HttpClient client = _testServer.CreateClient(139);

            // Create comments 
            CommentDto commentDto = new CommentDto
            {
                PostId = 70,
                UserId = 139,
                ParentCommentId = 6,
                Body = "Test comment!",
                CommentTypeId = 1,
            };
            HttpResponseMessage responseCreate = await client.PostAsync(_apiEndpoint + $"api/Comment/Post/", commentDto, new JsonMediaTypeFormatter());
            int commentId = await responseCreate.Content.ReadAsAsync<int>();

            Assert.AreEqual(HttpStatusCode.Created, responseCreate.StatusCode);
            Assert.AreEqual($"/post/{POST_TYPE}/{POST_ID}/{POST_TITLE}", responseCreate.Headers.Location.ToString());

            // Test post with single comment
            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + $"api/Comment/Get/{POST_ID}");
            IEnumerable<CommentDto> comments = await response.Content.ReadAsAsync<IEnumerable<CommentDto>>();

            Assert.NotNull(comments);
            Assert.AreEqual(1, comments.Count());

            // Delete comment
            string deleteCommand = $"DELETE FROM WDM.[Comment] where CommentId ={commentId}";

            using (SqlConnection connection = new SqlConnection(DatabaseContextResolver.GetConnectionString()))
            {
                SqlCommand command = new SqlCommand(deleteCommand, connection);
                connection.Open();
                command.BeginExecuteNonQuery();
            }
        }
    }
}
