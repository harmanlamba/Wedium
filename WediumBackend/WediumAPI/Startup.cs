using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using WediumAPI.Helper;
using WediumAPI.Models;
using WediumAPI.Service;
using WediumAPI.Services;

namespace WediumAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .WithExposedHeaders("location"));
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            if (!EnvironmentSettingsResolver.TryGetConnectionStringFromEnvironment(out string connectionString))
            {
                connectionString = Configuration.GetConnectionString("WediumDatabase");
            }

            services.AddDbContext<WediumContext>(options =>
                    options.UseSqlServer(connectionString));


            
            if (!EnvironmentSettingsResolver.TryGetJWTSecretFromEnvironment(out string jwtSecret))
            {
                jwtSecret = Configuration["Options:JwtSecret"];
            }

            byte[] key = Encoding.UTF8.GetBytes(jwtSecret);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;

                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
                
            services.Configure<Options>(Configuration.GetSection("Options"));
            services.AddControllers();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPostTypeService, PostTypeService>();
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<IPostLikeService, PostLikeService>();
            services.AddScoped<IFavouriteService, FavouriteService>();
            services.AddScoped<IWikiMediaApiService, WikiMediaApiService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<ICommentLikeService, CommentLikeService>();
            services.AddScoped<IUserStatsService, UserStatsService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();


            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}