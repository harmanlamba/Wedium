using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using WediumAPI;
using WediumAPI.Models;

namespace WediumTestSuite.Helper
{
    public class TestServerHandler : IDisposable
    {
        private TestServer _server;
        private string _guid = Guid.NewGuid().ToString();

        public TestServerHandler()
        {
            MockDBContextInitializer.InitializeDB(getWediumContextOptions());

            _server = new TestServer(new WebHostBuilder()
                .UseConfiguration(AppSettingsResolver.InitConfiguration())
                .UseStartup<Startup>()
                .ConfigureServices(services => {
                    services.AddDbContext<WediumContext>(options => options.UseInMemoryDatabase(_guid));
                }));
        }

        public DbContextOptions<WediumContext> getWediumContextOptions()
        {
            return new DbContextOptionsBuilder<WediumContext>()
                .UseInMemoryDatabase(_guid)
                .Options;
        } 

        public HttpClient CreateClient(int? authenticationClaimValue = null)
        {
            HttpClient client = _server.CreateClient();

            if (authenticationClaimValue != null)
            {
                AuthenticateClient(client, authenticationClaimValue.Value);
            }

            return client;
        }

        public void AuthenticateClient(HttpClient client, int authenticationClaimValue)
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
