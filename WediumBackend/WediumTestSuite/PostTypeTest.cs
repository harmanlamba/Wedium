using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using WediumAPI;
using WediumAPI.Helper;
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    class PostTypeTest
    {
        private HttpClient _client;
        private string _apiEndpoint;

        [OneTimeSetUp]
        public void Setup()
        {
            _client = TestServerInitialiser.GetClient();

            if (SettingsResolver.TryGetSetting("APIEndpointURI", out string apiEndpoint))
            {
                _apiEndpoint = apiEndpoint;
            }
        }

        [Test]
        public async Task GetPostTypeTest()
        {
            HttpResponseMessage response = await _client.GetAsync(_apiEndpoint + "api/PostType/Get");
            JArray content = JArray.Parse(await response.Content.ReadAsStringAsync());

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(13, content.Count);
        }
    }
}
