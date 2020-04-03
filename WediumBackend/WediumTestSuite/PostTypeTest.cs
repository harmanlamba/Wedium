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
        private APIWebApplicationFactory _factory;
        private HttpClient _client;

        [OneTimeSetUp]
        public void Setup()
        {
            _factory = new APIWebApplicationFactory();
            _client = _factory.CreateClient();
        }

        [Test]
        public async Task GetPostTypeTest()
        {
            HttpResponseMessage response = await _client.GetAsync("https://localhost:44300/api/PostType/Get");
            JArray content = JArray.Parse(await response.Content.ReadAsStringAsync());

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(13, content.Count);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _client.Dispose();
            _factory.Dispose();
        }
    }
}
