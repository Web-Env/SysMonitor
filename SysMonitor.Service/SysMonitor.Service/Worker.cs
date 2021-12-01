using AutoMapper;
using LibreHardwareMonitor.Hardware;
using Newtonsoft.Json;
using SysMonitor.Service.Models;

namespace SysMonitor.Service
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IMapper _mapper;

        public Worker(ILogger<Worker> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                Monitor();

                await Task.Delay(1000, stoppingToken);
            }
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
                foreach (IHardware subHardware in hardware.SubHardware) subHardware.Accept(this);
            }
            public void VisitSensor(ISensor sensor) { }
            public void VisitParameter(IParameter parameter) { }
        }

        public void Monitor()
        {
            Computer computer = new()
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
                    var fanSensorModels = MapHardwareClassesToModels<ISensor, FanModel>(fanSensors);

                    var cpuFan = fanSensorModels?.FirstOrDefault();
                    cpuFan.FanType = FanType.Cpu;

                    var fanSensorJson = JsonConvert.SerializeObject(fanSensorModels);
                    Console.WriteLine(fanSensorJson);
                    var trimmedJson = fanSensorJson.Remove(0, 1).Remove(fanSensorJson.Length - 2, 1);
                    trimmedJson = trimmedJson.Replace("{", "[");
                    trimmedJson = trimmedJson.Replace("}", "]");
                    _logger.LogInformation(trimmedJson, DateTimeOffset.Now);
                }

                foreach (ISensor sensor in hardware.Sensors)
                {
                    //Console.WriteLine("\tSensor: {0}, value: {1}", sensor.Name, sensor.Value);
                }
            }

            computer.Close();
        }

        protected TModel MapHardwareClassToModel<TEntity, TModel>(TEntity hardwareClass)
        {
            return _mapper.Map<TModel>(hardwareClass);
        }

        protected List<TModel> MapHardwareClassesToModels<TEntity, TModel>(IEnumerable<TEntity> hardwareClass)
        {
            return _mapper.Map<IEnumerable<TEntity>, List<TModel>>(hardwareClass);
        }
    }
}