using AutoMapper;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;

namespace DiscApi.Extensions
{
    public class MappingProfile:Profile
    {
        public MappingProfile() {
            CreateMap<UserDTOResponse, User>()
                    .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.firstName))
                    .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.lastName))
                    .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.phoneNumber))
                    .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.email));
        }
    }
}
