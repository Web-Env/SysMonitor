using AutoMapper;
using LibreHardwareMonitor.Hardware;
using Newtonsoft.Json;
using SysMonitor.Service.Helpers;
using SysMonitor.Service.Mappers;
using System;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Security.AccessControl;
using System.Security.Principal;
using System.ServiceProcess;
using System.Text;
using System.Threading;

namespace SysMonitor.Service
{
    partial class ReportingService : ServiceBase
    {
        private readonly EventLog _eventLog;

        public ReportingService()
        {
            InitializeComponent();

            _eventLog = new EventLog("Application");
            _eventLog.Source = "SysMonitor";
        }

        protected override void OnStart(string[] args)
        {
            new Thread(() =>
            {
                while (true)
                {
                    var pipeSecurity = new PipeSecurity();
                    pipeSecurity.SetAccessRule(new PipeAccessRule(new SecurityIdentifier(WellKnownSidType.BuiltinUsersSid, null), PipeAccessRights.ReadWrite, AccessControlType.Allow));

                    using (var pipe = new NamedPipeServerStream("SysMonitor", PipeDirection.InOut, 10, PipeTransmissionMode.Message, PipeOptions.None, 0, 0, pipeSecurity: pipeSecurity))
                    {
                        pipe.WaitForConnection();

                        var mappersConfig = new MapperConfiguration(cfg =>
                        {
                            cfg.AddProfile(new HardwareClassToModelProfile());
                        });

                        var mapper = mappersConfig.CreateMapper();

                        var hardware = HardwareHelper.Monitor(mapper);

                        var hardwareJson = JsonConvert.SerializeObject(hardware, Formatting.Indented,
                            new JsonSerializerSettings
                            {
                                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                            });
                        
                        try
                        {
                            byte[] messageBytes = Encoding.UTF8.GetBytes(hardwareJson);
                            pipe.Write(messageBytes, 0, messageBytes.Length);
                        }
                        catch (Exception ex)
                        {
                            _eventLog.WriteEntry(ex.Message, EventLogEntryType.Error, 0);
                        }
                    }
                }
            }).Start();
        }

        public class UpdateVisitor : IVisitor
        {
            public void VisitComputer(IComputer computer)
            {
                computer.Traverse(this);
            }
            public void VisitHardware(IHardware hardware)
            {
                hardware.Update();
                foreach (IHardware subHardware in hardware.SubHardware)
                {
                    subHardware.Accept(this);
                }
            }
            public void VisitSensor(ISensor sensor) { }
            public void VisitParameter(IParameter parameter) { }
        }

        protected override void OnStop()
        {
            // TODO: Add code here to perform any tear-down necessary to stop your service.
        }
    }
}
