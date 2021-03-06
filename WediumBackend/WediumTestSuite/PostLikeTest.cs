﻿using NUnit.Framework;
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

        [Test]
        public async Task GetLikedPostInvalidPostId()
        {
            HttpClient client = _testServer.CreateClient(1);

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/postlike/Get?after_id=0");
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public async Task GetLikedPostValidLimitInputTest()
        {
            HttpClient client = _testServer.CreateClient(1);

            int limit1 = 2;

            HttpResponseMessage limit1Response = await client.GetAsync(_apiEndpoint + $"api/postlike/Get?limit={limit1}");
            Assert.AreEqual(HttpStatusCode.OK, limit1Response.StatusCode);

            List<PostDto> limit1Content = await limit1Response.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(limit1, limit1Content.Count);

            int limit2 = 3;

            HttpResponseMessage limit2Response = await client.GetAsync(_apiEndpoint + $"api/postlike/Get?limit={limit2}");
            Assert.AreEqual(HttpStatusCode.OK, limit2Response.StatusCode);

            List<PostDto> limit2Content = await limit2Response.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(limit2, limit2Content.Count);
        }

        [Test]
        public async Task GetLikedPostNegativeLimitInputTest()
        {
            HttpClient client = _testServer.CreateClient(1);

            int limit1 = -1;

            HttpResponseMessage limit1Response = await client.GetAsync(_apiEndpoint + $"api/postlike/Get?limit={limit1}");
            Assert.AreEqual(HttpStatusCode.BadRequest, limit1Response.StatusCode);
        }

        [Test]
        public async Task GetLikedPostAfterIdInputTest()
        {
            HttpClient client = _testServer.CreateClient(2);

            int limit = 2;

            HttpResponseMessage firstBatchResponse = await client.GetAsync(_apiEndpoint + $"api/postlike/Get?limit={limit}");
            Assert.AreEqual(HttpStatusCode.OK, firstBatchResponse.StatusCode);

            List<PostDto> firstBatchContent = await firstBatchResponse.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(limit, firstBatchContent.Count);

            int postId = firstBatchContent[limit - 2].PostId;

            HttpResponseMessage secondBatchResponse = await client.GetAsync(_apiEndpoint + $"api/postlike/Get?limit={limit}&after_id={postId}");
            Assert.AreEqual(HttpStatusCode.OK, secondBatchResponse.StatusCode);

            List<PostDto> secondBatchContent = await secondBatchResponse.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(limit, secondBatchContent.Count);
            Assert.AreEqual(firstBatchContent[limit - 1].PostId, secondBatchContent[0].PostId);
        }

        [Test]
        public async Task GetLikedPostOfUserOnlyTest()
        {
            HttpClient client = _testServer.CreateClient(2);

            int favouritedPosts = 4;

            HttpResponseMessage getAllResponse = await client.GetAsync(_apiEndpoint + $"api/postlike/Get");
            Assert.AreEqual(HttpStatusCode.OK, getAllResponse.StatusCode);

            List<PostDto> responseContent = await getAllResponse.Content.ReadAsAsync<List<PostDto>>();
            Assert.AreEqual(favouritedPosts, responseContent.Count);
        }
    }
}
