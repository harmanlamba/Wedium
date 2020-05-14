using Newtonsoft.Json.Linq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    class PostTypeTest
    {
        private TestServerHandler _testServer;
        private string _apiEndpoint;

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            _apiEndpoint = AppSettingsResolver.GetSetting<string>("APIEndpointURI");
        }

        [SetUp]
        public void Setup()
        {
            _testServer = new TestServerHandler();
        }

        [Test]
        public async Task GetPostTypeTest()
        {
            using (HttpClient client = _testServer.CreateClient())
            {
                HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/PostType/");
                Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

                List<PostTypeDto> content = await response.Content.ReadAsAsync<List<PostTypeDto>>();
                Assert.AreEqual(MockDBContextInitializer.InitialPostTypes().Length, content.Count);
            }
        }
    }
}
