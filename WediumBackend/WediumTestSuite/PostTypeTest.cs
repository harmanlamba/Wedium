using Newtonsoft.Json.Linq;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    class PostTypeTest
    {
        private TestServerHandler _testServer;
        private string _apiEndpoint;

        [OneTimeSetUp]
        public void Setup()
        {
            _testServer = new TestServerHandler();

            _apiEndpoint = AppSettingsResolver.GetSetting("APIEndpointURI");
        }

        [Test]
        public async Task GetPostTypeTest()
        {
            using (HttpClient client = _testServer.CreateClient())
            {
                HttpResponseMessage response = await client.GetAsync(_apiEndpoint + "api/PostType/Get");
                JArray content = JArray.Parse(await response.Content.ReadAsStringAsync());

                Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
                Assert.AreEqual(13, content.Count);
            }
        }
    }
}
