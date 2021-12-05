using AutoMapper;
using LibreHardwareMonitor.Hardware;
using SysMonitor.Service.Models;

namespace SysMonitor.Service.Mappers
{
    public class HardwareClassToModelProfile : Profile
    {
        public HardwareClassToModelProfile()
        {
            CreateMap<ISensor, FanModel>()
                .ForMember(dest => dest.Rpm, src => src.MapFrom(sensor => sensor.Value));
        }
    }
}
