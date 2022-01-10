using AutoMapper;
using LibreHardwareMonitor.Hardware;
using SysMonitor.Service.Models;
using System;
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

            var gpuHardware = hardware.FirstOrDefault(h => h.HardwareType == HardwareType.GpuNvidia || h.HardwareType == HardwareType.GpuAmd);
            hardwareReport.GpuModel = gpuHardware?.Name;

            computer.Close();
            return hardwareReport;
        }

        public static HardwareReportModel Monitor(IMapper mapper, HardwareReportModel hardwareReport)
        {
            List<FanModel> fans = new List<FanModel>();
            CpuModel cpu = new CpuModel();
            MemoryModel memory = new MemoryModel();
            GpuModel gpu = new GpuModel();

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
                if (hardware.HardwareType == HardwareType.Motherboard)
                {
                    foreach (IHardware subhardware in hardware.SubHardware)
                    {
                        var fanSensors = subhardware.Sensors.Where(s => s.SensorType == SensorType.Fan && s.Value != 0);
                        var fanSensorModels = MapHardwareClassesToModels<ISensor, FanModel>(mapper, fanSensors);

                        var cpuFan = fanSensorModels?.FirstOrDefault();

                        if (cpuFan != null)
                        {
                            cpuFan.FanType = FanType.Cpu;
                        }

                        fans.AddRange(fanSensorModels);
                    }
                }
                else if (hardware.HardwareType == HardwareType.Cpu)
                {
                    float clocksCumulative = 0f;
                    var clockCount = 0;

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Load && sensor.Name == "CPU Total")
                        {
                            cpu.Load = sensor.Value;
                        }
                        else if (sensor.SensorType == SensorType.Temperature && sensor.Name == "CPU Package")
                        {
                            cpu.Temperature = sensor.Value;
                        }
                        else if (sensor.SensorType == SensorType.Clock)
                        {
                            clocksCumulative += sensor.Value.Value;
                            clockCount++;
                        }
                    }

                    cpu.Clock = clocksCumulative / clockCount;
                }
                else if (hardware.HardwareType == HardwareType.Memory)
                {
                    var memoryUsed = 0f;
                    var memoryAvailable = 0f;

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Data && sensor.Name == "Memory Used")
                        {
                            memoryUsed = sensor.Value.Value;
                        }
                        else if (sensor.SensorType == SensorType.Data && sensor.Name == "Memory Available")
                        {
                            memoryAvailable = sensor.Value.Value;
                        }
                    }

                    memory.Used = Math.Round(memoryUsed, 2);
                    memory.Capacity = Math.Round(memoryUsed + memoryAvailable, 0);
                }
                else if (hardware.HardwareType == HardwareType.GpuAmd || hardware.HardwareType == HardwareType.GpuNvidia)
                {
                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Load && sensor.Name == "GPU Core")
                        {
                            gpu.Load = sensor.Value;
                        }
                        else if (sensor.SensorType == SensorType.Temperature && sensor.Name == "GPU Core")
                        {
                            gpu.Temperature = sensor.Value;
                        }
                        else if (sensor.SensorType == SensorType.Clock && sensor.Name == "GPU Core")
                        {
                            gpu.CoreClock = sensor.Value;
                        }
                        else if (sensor.SensorType == SensorType.Clock && sensor.Name == "GPU Memory")
                        {
                            gpu.MemoryClock = sensor.Value;
                        }
                        else if (sensor.SensorType == SensorType.SmallData && sensor.Name == "GPU Memory Used")
                        {
                            gpu.MemoryUsed = sensor.Value;
                        }
                        else if (sensor.SensorType == SensorType.SmallData && sensor.Name == "GPU Memory Total")
                        {
                            gpu.MemoryCapacity = sensor.Value;
                        }
                        else if (sensor.SensorType == SensorType.Fan && sensor.Name == "GPU")
                        {
                            gpu.FanRpm = sensor.Value;
                        }
                    }
                }
            }

            computer.Close();

            hardwareReport.Cpu = cpu;
            hardwareReport.Memory = memory;
            hardwareReport.Gpu = gpu;
            hardwareReport.Fans = fans;

            return hardwareReport;
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
