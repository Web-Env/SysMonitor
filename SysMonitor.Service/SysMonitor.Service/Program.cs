using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SysMonitor.Service.Extensions;

namespace SysMonitor.Service
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseWindowsService()
                .ConfigureServices(services =>
                {
                    services.AddHostedService<Worker>();
                    services.AddCustomMappers();
                });
    }
}

