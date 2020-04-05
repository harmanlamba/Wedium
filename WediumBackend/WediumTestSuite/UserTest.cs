using Newtonsoft.Json;
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
        public async Task PostInvalidOneTimeTokenTestAsync()
        {
            HttpClient client = _testServer.CreateClient();

            OneTimeTokenDto invalidToken = new OneTimeTokenDto
            {
                tokenId = "testToken"
            };

            HttpResponseMessage response = await client.PostAsync(_apiEndpoint + "api/user/google", invalidToken, new JsonMediaTypeFormatter());

            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
