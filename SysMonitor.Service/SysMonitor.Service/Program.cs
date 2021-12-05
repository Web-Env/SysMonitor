using Microsoft.Extensions.DependencyInjection;
using SysMonitor.Service.Extensions;
using System;
using System.ServiceProcess;

namespace SysMonitor.Service
{
    internal static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>

        private static IServiceProvider _serviceProvider;

        static void Main()
        {
            var servicesCollection = new ServiceCollection();
            servicesCollection.AddCustomMappers();
            _serviceProvider = servicesCollection.BuildServiceProvider();

            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[]
            {
                new ReportingService()
            };
            ServiceBase.Run(ServicesToRun);
        }
    }
}
