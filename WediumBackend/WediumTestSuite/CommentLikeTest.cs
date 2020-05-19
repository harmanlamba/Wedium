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
    class CommentLikeTest
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
        public async Task LikingAndUnlikingCommentTest()
        {
            HttpClient client = _testServer.CreateClient(1);

            CommentLikeDto commentLikeDto = new CommentLikeDto
            {
                CommentId = 1
            };

            HttpResponseMessage createResponse = await client.PostAsync(_apiEndpoint + "api/commentLike/post", commentLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.Created, createResponse.StatusCode);

            HttpResponseMessage duplicateCreateResponse = await client.PostAsync(_apiEndpoint + "api/commentLike/post", commentLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.OK, duplicateCreateResponse.StatusCode);

            HttpResponseMessage deleteResponse = await client.PostAsync(_apiEndpoint + "api/commentLike/delete", commentLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.OK, deleteResponse.StatusCode);

            HttpResponseMessage duplicateDeleteResponse = await client.PostAsync(_apiEndpoint + "api/commentLike/delete", commentLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NoContent, duplicateDeleteResponse.StatusCode);
        }

        [Test]
        public async Task LikeInvalidCommentIdTest()
        {
            HttpClient client = _testServer.CreateClient(1);

            CommentLikeDto commentLikeDto = new CommentLikeDto
            {
                CommentId = -1
            };

            HttpResponseMessage createResponse = await client.PostAsync(_apiEndpoint + "api/postLike/post", commentLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NotFound, createResponse.StatusCode);
        }

        [Test]
        public async Task UnlikeInvalidCommentIdTest()
        {
            HttpClient client = _testServer.CreateClient(1);

            CommentLikeDto commentLikeDto = new CommentLikeDto
            {
                CommentId = -1
            };

            HttpResponseMessage duplicateDeleteResponse = await client.PostAsync(_apiEndpoint + "api/postLike/delete", commentLikeDto, new JsonMediaTypeFormatter());
            Assert.AreEqual(HttpStatusCode.NotFound, duplicateDeleteResponse.StatusCode);
        }
    }
}
