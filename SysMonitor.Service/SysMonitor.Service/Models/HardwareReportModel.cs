namespace SysMonitor.Service.Models
{
    public class HardwareReportModel
    {
        public string CpuModel { get; set; }

        public double MemoryCapacity { get; set; }

        public string GpuModel { get; set; }

        public double GpuMemoryCapacity { get; set; }
    }
}
