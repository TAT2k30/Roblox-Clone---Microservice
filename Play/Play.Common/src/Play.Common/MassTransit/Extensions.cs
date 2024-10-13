using System.Reflection;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Play.Common.Service.Settings;
using Play.Common.Service.Settings.ServiceSettings;

namespace Play.Common.MassTransit
{
    public static class Extensions
    {
        public static IServiceCollection AddMassTransitWithRabbitMQ(this IServiceCollection services, IConfiguration configuration)
        {
            // Lấy ServiceSettings từ configuration
            var serviceSettings = configuration.GetSection(nameof(ServiceSettings)).Get<ServiceSettings>();
            if (serviceSettings == null)
            {
                throw new InvalidOperationException("ServiceSettings không được cấu hình. Vui lòng kiểm tra file cấu hình.");
            }

            // Đăng ký MassTransit với RabbitMQ
            services.AddMassTransit(x =>
            {
                // Đăng ký tất cả các consumer từ assembly hiện tại
                x.AddConsumers(Assembly.GetEntryAssembly());

                // Cấu hình RabbitMQ
                x.UsingRabbitMq((context, configurator) =>
                {
                    // Lấy RabbitMQSettings từ configuration
                    var rabbitMQSettings = configuration.GetSection(nameof(RabbitMQSettings)).Get<RabbitMQSettings>();
                    if (rabbitMQSettings == null)
                    {
                        throw new InvalidOperationException("RabbitMQSettings không được cấu hình. Vui lòng kiểm tra file cấu hình.");
                    }

                    // Cấu hình RabbitMQ host
                    if (string.IsNullOrWhiteSpace(rabbitMQSettings.Host))
                    {
                        throw new ArgumentException("RabbitMQ host không được để trống. Vui lòng cấu hình giá trị hợp lệ.");
                    }
                    configurator.Host(rabbitMQSettings.Host);

                    // Cấu hình các endpoint với định dạng KebabCase
                    configurator.ConfigureEndpoints(context, new KebabCaseEndpointNameFormatter(serviceSettings.ServiceName, false));
                });
            });

            // Đăng ký dịch vụ MassTransitHostedService
            services.AddOptions<MassTransitHostOptions>().Configure(options =>
            {
                options.WaitUntilStarted = true;
                options.StartTimeout = TimeSpan.FromSeconds(10);
                options.StopTimeout = TimeSpan.FromSeconds(30);
            });

            return services; // Trả về IServiceCollection
        }
    }
}
