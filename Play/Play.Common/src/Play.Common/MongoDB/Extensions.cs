using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Play.Common.Service.Entities;
using Play.Common.Service.Repositories;
using Play.Common.Service.Settings.MongoDbSettings;
using Play.Common.Service.Settings.ServiceSettings;

namespace Play.Common.Service.MongoDB
{
    public static class Extensions
    {
        public static IServiceCollection AddMongo(this IServiceCollection services)
        {
            services.AddSingleton(serviceProvider =>
{
    var configuration = serviceProvider.GetService<IConfiguration>()
        ?? throw new InvalidOperationException("Configuration service is not available.");

    var serviceSettings = configuration.GetSection(nameof(ServiceSettings)).Get<ServiceSettings>()
        ?? throw new InvalidOperationException("Service settings are not configured properly.");

    var mongoDbSettings = configuration.GetSection(nameof(MongoDbSettings)).Get<MongoDbSettings>()
        ?? throw new InvalidOperationException("MongoDB settings are not configured properly.");

    var mongoClient = new MongoClient(mongoDbSettings.ConnectionString);
    return mongoClient.GetDatabase(serviceSettings.ServiceName);
});

            return services;
        }

        public static IServiceCollection AddMongoRepository<T>(this IServiceCollection services, string collectionName) where T : IEntity
        {
            services.AddSingleton<IRepository<T>>(serviceProvider =>
            {
                var database = serviceProvider.GetService<IMongoDatabase>() ?? throw new InvalidOperationException("MongoDB database is not available.");
                return new MongoRepository<T>(database, collectionName);
            });

            return services;
        }
    }
}

