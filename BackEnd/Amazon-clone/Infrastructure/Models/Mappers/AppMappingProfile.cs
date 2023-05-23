using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;

namespace Infrastructure.Models.Mappers;

public class AppMappingProfile : Profile
{
  

    public AppMappingProfile()
    {
     
        CreateMap<ProductEntity, ProductVM>().ForMember(dst => dst.Category,
            act =>
                act.MapFrom(src => src.Category.Name));
        CreateMap<ProductVM, ProductEntity>();
        CreateMap<CategoryEntity, CategoryVM>();
  
    }

    
}