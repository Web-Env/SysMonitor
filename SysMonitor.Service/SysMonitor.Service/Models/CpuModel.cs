namespace SysMonitor.Service.Models
{
    public class CpuModel
    {
        public string Name { get; set; }

        public double Load { get; set; }

        public int Temperature { get; set; }

        public int Clock { get; set; }
    }
}
