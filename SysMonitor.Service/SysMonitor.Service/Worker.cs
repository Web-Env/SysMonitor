using AutoMapper;
using Newtonsoft.Json;
using SysMonitor.Service.Helpers;
using SysMonitor.Service.Models;
using System.IO.Pipes;
using System.Security.AccessControl;
using System.Security.Principal;

namespace SysMonitor.Service
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IMapper _mapper;

        private HardwareReportModel _hardwareReport;

        public Worker(ILogger<Worker> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (true)
            {
                var pipeSecurity = new PipeSecurity();
                pipeSecurity.SetAccessRule(new PipeAccessRule(new SecurityIdentifier(WellKnownSidType.BuiltinUsersSid, null), PipeAccessRights.ReadWrite, AccessControlType.Allow));

                using (var pipe = new NamedPipeServerStream("SysMonitor", PipeDirection.InOut, 10, PipeTransmissionMode.Message, PipeOptions.None, 0, 0))
                {
                    pipe.SetAccessControl(pipeSecurity);
                    pipe.WaitForConnection();
                    StreamReader sr = new StreamReader(pipe);
                    StreamWriter sw = new StreamWriter(pipe);
                    sw.Write("Test");

                    var hardware = HardwareHelper.GenerateHardwareReport();

                    var hardwareJson = JsonConvert.SerializeObject(hardware, Formatting.Indented,
                        new JsonSerializerSettings
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        });

                    try
                    {
                        sw.Write("Test");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex.Message);
                    }
                }
            }
        }
    }
}