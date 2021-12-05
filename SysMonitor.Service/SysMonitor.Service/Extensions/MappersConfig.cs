using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using SysMonitor.Service.Mappers;

namespace SysMonitor.Service.Extensions
{
    public static class MappersConfig
    {
        public static void AddCustomMappers(this IServiceCollection services)
        {
            var mappersConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new HardwareClassToModelProfile());
            });

            var mapper = mappersConfig.CreateMapper();

            services.AddSingleton(mapper);
        }
    }
}
