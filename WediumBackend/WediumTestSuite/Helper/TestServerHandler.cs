using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using WediumAPI;

namespace WediumTestSuite.Helper
{
    public class TestServerHandler : IDisposable
    {
        private TestServer _server;

        public TestServerHandler()
        {
            _server = new TestServer(new WebHostBuilder()
                .UseConfiguration(AppSettingsResolver.InitConfiguration())
                .UseStartup<Startup>());
        }

        public HttpClient CreateClient()
        {
            return _server.CreateClient();
        }

        public void Dispose()
        {
            _server.Dispose();
        }
    }
}
