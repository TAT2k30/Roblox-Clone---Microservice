using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Play.Common.Service.Settings.MongoDbSettings;


namespace Play.Common.CORS
{
    public static class Extensions
    {
        public static IServiceCollection AddCORSConfig(this IServiceCollection services, IConfiguration configuration)
        {
            var corsSettings = configuration.GetSection(nameof(CorsSettings)).Get<CorsSettings>()
      ?? throw new InvalidOperationException("CORS settings are not configured properly.");

            // Cấu hình CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", builder =>
                {
                    builder.WithOrigins(corsSettings.AllowedOrigin)
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });

            });
            
            return services;
        }
    }
}
