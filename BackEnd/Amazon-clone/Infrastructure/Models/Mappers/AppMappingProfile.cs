using AutoMapper;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Entities.FilterEntities;
using DAL.Entities.Music;
using DAL.FAQ;
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
        
        CreateMap<OrderDTO, Order>();
        CreateMap<Order, OrderDTO>();

        CreateMap<OrderedProduct, OrderedProductDTO>();
        CreateMap<OrderedProductDTO, OrderedProduct>();

        CreateMap<OrderedProduct, OrderedProductVM>();
        CreateMap<OrderedProductVM, OrderedProduct>();

        CreateMap<OrderVM, Order>();
        CreateMap<Order, OrderVM>();

        CreateMap<ProductOneVM, Product>();
        CreateMap<Product, ProductOneVM>();

        CreateMap<Company, CompanyDTO>();
        CreateMap<CompanyDTO, Company>();

        CreateMap<CompanyVM, Company>();
        CreateMap<Company, CompanyVM>();


        CreateMap<OrderedProduct, OrderedProductUpdatedVM>();
        CreateMap<OrderedProductUpdatedVM, OrderedProduct>();

        CreateMap<LikedTracks, SetLikedTrackDTO>();
        CreateMap<SetLikedTrackDTO, LikedTracks>();

        CreateMap<LikedTracks, LikedTrackVM>();
        CreateMap<LikedTrackVM, LikedTracks>();

        CreateMap<LikedTrackVM, TrackForLikedTracksVM>();
        CreateMap<TrackForLikedTracksVM, LikedTrackVM>();

        CreateMap<AddTrackHistoryDTO, TrackHistory>();
        CreateMap<TrackHistory, AddTrackHistoryDTO>();

        CreateMap<TrackComment, TrackCommentDTO>();
        CreateMap<TrackCommentDTO, TrackComment>();

        CreateMap<TrackComment, TrackCommentVM>();
        CreateMap<TrackCommentVM, TrackComment>();

        CreateMap<GenreDTO, Genre>();
        CreateMap<Genre, GenreDTO>();

        CreateMap<FAQDTO, FrequentlyAskedQuestion>();
        CreateMap<FrequentlyAskedQuestion, FAQDTO>();

        CreateMap<AnswerFAQDTO, AnswerToFAQ>();
        CreateMap<AnswerToFAQ, AnswerFAQDTO>();

        CreateMap<FAQVM, FrequentlyAskedQuestion>();

        CreateMap<AnswerFAQVM, AnswerToFAQ>();
        CreateMap<AnswerToFAQ, AnswerFAQVM>(); // Map AnswerToFAQ to AnswerFAQVM

        CreateMap<FrequentlyAskedQuestion, FAQVM>()
            .ForMember(dest => dest.AnswerFAQ, opt => opt.MapFrom(src => src.AnswerToFAQ)); // Map AnswerToFAQ to AnswerToFAQVM within FAQVM

        CreateMap<Album, AlbumVM>();
        CreateMap<AlbumVM, Album>();

        CreateMap<Album, AlbumDTO>();
        CreateMap<AlbumDTO, Album>();

        CreateMap<Category, EditCategoryDTO>();
        CreateMap<EditCategoryDTO, Category>();

        CreateMap<EditProductDTO, Product>();
        CreateMap<Product, EditProductDTO>();

        CreateMap<Address, AddressVM>();
        CreateMap<AddressVM, Address>();

        CreateMap<EditUserDTO, User>();
        CreateMap<User, EditUserDTO>();


    }


}