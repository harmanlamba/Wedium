using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using WediumAPI;

namespace WediumTestSuite.Helper
{
    public static class TestServerInitialiser
    {
        public static HttpClient GetClient()
        {
            TestServer server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>());
            
            return server.CreateClient();
        }
    }
}
