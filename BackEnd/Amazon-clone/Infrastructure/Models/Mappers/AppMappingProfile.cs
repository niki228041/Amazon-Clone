using AutoMapper;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Models.Caterories;

namespace Infrastructure.Models.Mappers;

public class AppMappingProfile : Profile
{
    public AppMappingProfile()
    {
     
        CreateMap<Product, ProductVM>().ForMember(dst => dst.Category,
            act =>
                act.MapFrom(src => src.Category.Name));
        CreateMap<ProductVM, Product>();
        CreateMap< Category, CategoryVM>();

        CreateMap<Product, CreateProductDTO>();
        CreateMap<CreateProductDTO, Product>();

        CreateMap<CategoryCreateVM, Category>();
        CreateMap<Category, CategoryCreateVM>();

        CreateMap<ProductImageVM,ProductImage>();
        CreateMap<ProductImage, ProductImageVM>();

        CreateMap<Comment,CreateCommentDTO>();
        CreateMap<CreateCommentDTO, Comment>();

        CreateMap<CommentVM, Comment>();
        CreateMap<Comment,CommentVM>();

    }


}