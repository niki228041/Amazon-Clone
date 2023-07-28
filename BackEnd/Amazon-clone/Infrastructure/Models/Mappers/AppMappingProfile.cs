using AutoMapper;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Entities.FilterEntities;
using DAL.Entities.Music;
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
        CreateMap<User, AllUsersVM>();

        CreateMap<RegisterViewModel, User>();
        CreateMap<User, RegisterViewModel>();

        CreateMap<VariantVM, Variant>();
        CreateMap<Variant, VariantVM>();

        CreateMap<OptionsVM, Options>();
        CreateMap<Options, OptionsVM>();

        CreateMap<VariantDTO, Variant>();
        CreateMap<Variant,VariantDTO>();

        CreateMap<GenreVM, Genre>();
        CreateMap<Genre,GenreVM> ();

        CreateMap<Track, TrackVM>();
        CreateMap<TrackVM, Track>();
        

        CreateMap<Track, TrackDTO>();
        CreateMap<TrackDTO, Track>();

        CreateMap<Card, CardVM>();
        CreateMap<CardVM, Card>();

        CreateMap<Card, CardDTO>();
        CreateMap<CardDTO, Card>();

        CreateMap<Address, AddressDTO>();
        CreateMap<AddressDTO, Address>();
    }


}