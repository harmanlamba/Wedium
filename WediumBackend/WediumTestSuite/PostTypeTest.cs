using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using WediumAPI;
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    class PostTypeTest
    {
        private TestServer _server;
        private HttpClient _client;

        [OneTimeSetUp]
        public void Setup()
        {
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>());
            _client = _server.CreateClient();
        }

        [Test]
        public async Task GetPostTypeTest()
        {
            HttpResponseMessage response = await _client.GetAsync("https://localhost:44300/api/PostType/Get");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            JArray content = JArray.Parse(await response.Content.ReadAsStringAsync());
            Assert.AreEqual(13, content.Count);
        }
    }
}
