using Newtonsoft.Json;
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
    public class UserTest
    {
        private TestServerHandler _testServer;
        private string _apiEndpoint;

        [OneTimeSetUp]
        public void Setup()
        {
            _testServer = new TestServerHandler();

            _apiEndpoint = AppSettingsResolver.GetSetting<string>("APIEndpointURI");
        }

        [Test]
        public async Task PostInvalidOneTimeTokenTest()
        {
            HttpClient client = _testServer.CreateClient();

            OneTimeTokenDto invalidToken = new OneTimeTokenDto
            {
                TokenId = "testToken"
            };

            HttpResponseMessage response = await client.PostAsync(_apiEndpoint + "api/user/google", invalidToken, new JsonMediaTypeFormatter());

            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Test]
        public async Task CheckUnauthenticatedUserAccessOfAuthenticateEndpointTest()
        {
            HttpClient client = _testServer.CreateClient();

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/user");
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Test]
        public async Task CheckAuthenticatedUserAccessOfAuthenticateEndpointTest()
        {
            WediumContext db = DatabaseContextResolver.GetDatabaseContext();

            User user = db.User
                .First(u => u.UserId == 136);

            HttpClient client = _testServer.CreateClient(user.UserId);

            HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/user");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            UserDto content = await response.Content.ReadAsAsync<UserDto>();
            Assert.AreEqual(user.FirstName, content.FirstName);
            Assert.AreEqual(user.LastName, content.LastName);
            Assert.AreEqual(user.Username, content.Username);
        }
    }
}
