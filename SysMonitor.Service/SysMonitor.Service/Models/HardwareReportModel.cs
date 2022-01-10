using System.Collections.Generic;

namespace SysMonitor.Service.Models
{
    public class HardwareReportModel
    {
        public string CpuModel { get; set; }

        public CpuModel Cpu { get; set; }

        public MemoryModel Memory { get; set; }

        public string GpuModel { get; set; }

        public GpuModel Gpu { get; set; }

        public List<FanModel> Fans { get; set; }
    }
}
