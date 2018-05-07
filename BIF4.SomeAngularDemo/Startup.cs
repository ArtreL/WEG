using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using BIF4.SomeAngularDemo.Data;
using Swashbuckle.AspNetCore.Swagger;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace BIF4.SomeAngularDemo
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
            services.AddMvc();

            services.AddDbContextPool<ToDoDbContext>(options => {
                options.UseSqlite("DataSource=todo.db");
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddSwaggerGen(options => {
                options.SwaggerDoc("v1", new Info { Title = "My TODO list", Version = "v1" });
            });

            // remove default OId->WS-Fed mappings since we don't need legacy claim IDs
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.Authority = "https://bif4-web-identity.azurewebsites.net/";
                    options.Audience = "ue5-api";
                    options.RequireHttpsMetadata = false;
                    options.IncludeErrorDetails = true;
                    options.SaveToken = true;
                });

            services.AddAuthorization();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseXfo(options => options.SameOrigin());

            app.UseCsp(config => {
                config.DefaultSources(cfg => cfg.Self())
                .ScriptSources(cfg => cfg.Self().UnsafeEval())
                .StyleSources(cfg => cfg.Self().UnsafeInline())
                .FontSources(cfg => cfg.Self())
                .ImageSources(cfg => cfg.Self().CustomSources("data:"))
                .FrameSources(cfg => cfg.Self().CustomSources("https://bif4-web-identity.azurewebsites.net"))
                .MediaSources(cfg => cfg.None())
                .FrameAncestors(cfg => cfg.None());

                if (env.IsDevelopment()) {
                    // webpack needs websocket but ws:// urls aren't covered under "self" policy
                    config.ConnectSources(cfg => cfg.CustomSources("*"));
                } else {
                    config.ConnectSources(cfg => cfg.Self().CustomSources("https://bif4-web-identity.azurewebsites.net"));
                }
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My TODO list V1");
            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
