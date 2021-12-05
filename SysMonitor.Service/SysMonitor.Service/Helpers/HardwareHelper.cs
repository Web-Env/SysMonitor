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

        public static void Monitor(IMapper mapper)
        {
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

            foreach (IHardware hardware in computer.Hardware)
            {
                //.WriteLine("Hardware: {0}", hardware.Name);

                foreach (IHardware subhardware in hardware.SubHardware)
                {
                    //Console.WriteLine("\tSubhardware: {0}", subhardware.Name);

                    foreach (ISensor sensor in subhardware.Sensors)
                    {
                        //Console.WriteLine("\t\tSensor: {0}, value: {1}", sensor.Name, sensor.Value);
                    }

                    var fanSensors = subhardware.Sensors.Where(s => s.SensorType == SensorType.Fan && s.Value != 0);
                    var fanSensorModels = MapHardwareClassesToModels<ISensor, FanModel>(mapper, fanSensors);

                    var cpuFan = fanSensorModels?.FirstOrDefault();

                    if (cpuFan != null)
                        cpuFan.FanType = FanType.Cpu;

                    //var fanSensorJson = JsonConvert.SerializeObject(fanSensorModels);
                    //Console.WriteLine(fanSensorJson);
                    //var trimmedJson = fanSensorJson.Remove(0, 1).Remove(fanSensorJson.Length - 2, 1);
                    //trimmedJson = trimmedJson.Replace("{", "[");
                    //trimmedJson = trimmedJson.Replace("}", "]");
                    //_logger.LogInformation(trimmedJson, DateTimeOffset.Now);
                }

                foreach (ISensor sensor in hardware.Sensors)
                {
                    //Console.WriteLine("\tSensor: {0}, value: {1}", sensor.Name, sensor.Value);
                }
            }

            computer.Close();
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
