namespace SysMonitor.Service.Models
{
    public class GpuModel
    {
        public string Name { get; set; }

        public double Load { get; set; }

        public int Temperature { get; set; }

        public int CoreClock { get; set; }

        public int MemoryClock { get; set; }

        public int MemoryCapacity { get; set; }

        public int MemoryUsed { get; set; }
    }
}
