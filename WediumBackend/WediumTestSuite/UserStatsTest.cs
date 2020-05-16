using NUnit.Framework;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    public class UserStatsTest
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
        public async Task GetUserStatsTest()
        {
            HttpClient client = _testServer.CreateClient(1);

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + $"api/user/stats");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            UserStatsDto content = await response.Content.ReadAsAsync<UserStatsDto>();
            Assert.AreEqual(content.CreatePostCount, 3);
            Assert.AreEqual(content.FavouritePostCount, 3);
        }

        [Test]
        public async Task GetUserStatsWithNoPostsAndFavouritesTest()
        {
            HttpClient client = _testServer.CreateClient(3);

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + $"api/user/stats");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            UserStatsDto content = await response.Content.ReadAsAsync<UserStatsDto>();
            Assert.AreEqual(content.CreatePostCount, 0);
            Assert.AreEqual(content.FavouritePostCount, 0);
        }
    }
}
