using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
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

        public HttpClient CreateClient(string authenticationClaimValue = null)
        {
            HttpClient client = _server.CreateClient();

            if (!string.IsNullOrEmpty(authenticationClaimValue))
            {
                AuthenticateClient(client, authenticationClaimValue);
            }

            return client;
        }

        public void AuthenticateClient(HttpClient client, string authenticationClaimValue)
        {
            string token = MockJWTTokenResolver.CreateMockJWTToken(authenticationClaimValue);

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }

        public void Dispose()
        {
            _server.Dispose();
        }
    }
}
