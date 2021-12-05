using SysMonitor.Service;
using SysMonitor.Service.Extensions;

IHost host = Host.CreateDefaultBuilder(args)
    .UseWindowsService()
    .ConfigureServices(services =>
    {
        services.AddHostedService<Worker>();
        services.AddCustomMappers();
    })
    .Build();

await host.RunAsync();