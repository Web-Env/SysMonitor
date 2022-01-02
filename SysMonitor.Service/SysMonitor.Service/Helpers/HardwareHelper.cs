using AutoMapper;
using LibreHardwareMonitor.Hardware;
using SysMonitor.Service.Models;
using System.Collections.Generic;
using System.Linq;

namespace SysMonitor.Service.Helpers
{
    public static class HardwareHelper
    {
        public class UpdateVisitor : IVisitor
        {
            public void VisitComputer(IComputer computer)
            {
                computer.Traverse(this);
            }
            public void VisitHardware(IHardware hardware)
            {
                hardware.Update();
                foreach (IHardware subHardware in hardware.SubHardware) subHardware.Accept(this);
            }
            public void VisitSensor(ISensor sensor) { }
            public void VisitParameter(IParameter parameter) { }
        }

        public static HardwareReportModel GenerateHardwareReport()
        {
            HardwareReportModel hardwareReport = new HardwareReportModel();

            Computer computer = new Computer()
            {
                IsCpuEnabled = true,
                IsGpuEnabled = true,
                IsMemoryEnabled = true,
                IsMotherboardEnabled = true,
                IsControllerEnabled = true,
                IsStorageEnabled = true
            };

            computer.Open();
            computer.Accept(new UpdateVisitor());

            var hardware = computer.Hardware;

            hardwareReport.CpuModel = hardware.FirstOrDefault(h => h.HardwareType == HardwareType.Cpu)?.Name;
            hardwareReport.MemoryCapacity = (double)(hardware.FirstOrDefault(h => h.HardwareType == HardwareType.Memory)?.Sensors?.Where(s => s.Identifier.ToString() == "/ram/data/0" || s.Identifier.ToString() == "/ram/data/1").Sum(s => s.Value));

            var gpuHardware = hardware.FirstOrDefault(h => h.HardwareType == HardwareType.GpuNvidia || h.HardwareType == HardwareType.GpuAmd);
            hardwareReport.GpuModel = gpuHardware?.Name;
            hardwareReport.GpuMemoryCapacity = (double)(gpuHardware.Sensors?.FirstOrDefault(s => s.Identifier.ToString() == "/gpu-nvidia/0/smalldata/2").Value);

            computer.Close();
            return hardwareReport;
        }

        public static List<FanModel> Monitor(IMapper mapper)
        {
            var fans = new List<FanModel>();
            Computer computer = new Computer
            {
                IsCpuEnabled = true,
                IsGpuEnabled = true,
                IsMemoryEnabled = true,
                IsMotherboardEnabled = true,
                IsControllerEnabled = true,
                IsStorageEnabled = true
            };

            computer.Open();
            computer.Accept(new UpdateVisitor());

            foreach (IHardware hardware in computer.Hardware)
            {
                foreach (IHardware subhardware in hardware.SubHardware)
                {
                    foreach (ISensor sensor in subhardware.Sensors)
                    {
                        //Console.WriteLine("\t\tSensor: {0}, value: {1}", sensor.Name, sensor.Value);
                    }

                    var fanSensors = subhardware.Sensors.Where(s => s.SensorType == SensorType.Fan && s.Value != 0);
                    var fanSensorModels = MapHardwareClassesToModels<ISensor, FanModel>(mapper, fanSensors);

                    var cpuFan = fanSensorModels?.FirstOrDefault();

                    if (cpuFan != null)
                    {
                        cpuFan.FanType = FanType.Cpu;
                    }

                    fans = fanSensorModels;
                }

                foreach (ISensor sensor in hardware.Sensors)
                {
                    //Console.WriteLine("\tSensor: {0}, value: {1}", sensor.Name, sensor.Value);
                }
            }

            computer.Close();
            return fans;
        }

        private static TModel MapHardwareClassToModel<TEntity, TModel>(IMapper mapper, TEntity hardwareClass)
        {
            return mapper.Map<TModel>(hardwareClass);
        }

        private static List<TModel> MapHardwareClassesToModels<TEntity, TModel>(IMapper mapper, IEnumerable<TEntity> hardwareClass)
        {
            return mapper.Map<IEnumerable<TEntity>, List<TModel>>(hardwareClass);
        }
    }
}
