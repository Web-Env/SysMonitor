namespace SysMonitor.Service.Models
{
    public enum FanType
    {
        Chassis,
        Cpu,
        Gpu
    }

    public  class FanModel
    {
        public FanType FanType { get; set; }

        public int Rpm { get; set; }
    }
}
