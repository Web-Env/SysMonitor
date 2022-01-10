namespace SysMonitor.Service.Models
{
    public class GpuModel
    {
        public float? Load { get; set; }

        public float? Temperature { get; set; }

        public float? CoreClock { get; set; }

        public float? MemoryClock { get; set; }

        public float? MemoryUsed { get; set; }

        public float? MemoryCapacity { get; set; }

        public float? FanRpm { get; set; }
    }
}
