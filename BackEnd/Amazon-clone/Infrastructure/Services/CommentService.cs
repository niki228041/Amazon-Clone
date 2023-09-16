using AutoMapper;
using DAL.Constants;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IImageService _imageService;
        private readonly ICommentImageService _commentImageService;
        private readonly IUserRepository _userRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IOrderedProductRepository _orderedProductRepository;


        public CommentService(ICommentRepository commentRepository, IMapper mapper, IImageService imageService, ICommentImageService commentImageService, IUserRepository userRepository,IProductRepository productRepository, IOrderRepository orderRepository, IOrderedProductRepository orderedProductRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _commentRepository = commentRepository;
            _mapper = mapper;
            _imageService = imageService;
            _commentImageService = commentImageService;
            _userRepository = userRepository;
            _orderedProductRepository = orderedProductRepository;
        }

        public async Task<ServiceResponse> CreateCommentAsync(CreateCommentDTO model)
        {
            Comment comment = _mapper.Map<CreateCommentDTO,Comment>(model);

            

            var orders = _orderRepository.GetAll().Include(order => order.OrderedProducts).Where(order => order.User.Id == model.UserId).ToList();

            var canLeaveComment = false;

            foreach (var order in orders)
            {
                foreach (var ordProd in order.OrderedProducts)
                {
                    if(ordProd.ProductId == model.ProductId && ordProd.isBought == true && ordProd.canLeaveComment == true)
                    {
                        canLeaveComment = true;
                        ordProd.canLeaveComment = false;
                        await _orderedProductRepository.Update(ordProd);
                    }
                }
            }

            if(canLeaveComment)
            {
                await _commentRepository.Create(comment);

                foreach (var order_ in orders)
                {
                    foreach (var prod_ in order_.OrderedProducts)
                    {
                        if (prod_.isBought == true && prod_.canLeaveComment == true)
                        {
                            canLeaveComment = true; break;
                        }
                    }
                }


                if (model.Images != null)
                foreach (var img in model.Images)
                {
                    var imgTemplate = img.Data;
                    var imgFileName = await _imageService.SaveImageAsync(imgTemplate, DirectoriesInProject.CommentImages);

                    CommentImage new_img_to_upload = new CommentImage { Name = imgFileName, CommentId = comment.Id };


                    await _commentImageService.CreateCommentImageAsync(new_img_to_upload);
                }

                if (comment != null)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = true,
                    };
                }
                }

            return null;

        }

        public async Task<List<CommentVM>> GetCommentsByProductIdAsync(int id)
        {
            List<Comment> comments = _commentRepository.GetAll().Where(comment=> comment.ProductId==id).ToList();
            var comments_vms = _mapper.Map<List<Comment>,List<CommentVM>>(comments);
            var users = await _userRepository.GetAllUsersAsync();

            for (int i = 0; i < comments_vms.Count; i++)
            {
                var foundedUser = users.FirstOrDefault(user => user.Id == comments_vms[i].UserId);
                if(!string.IsNullOrEmpty(foundedUser.DisplayName))
                {
                    comments_vms[i].UserName = foundedUser.DisplayName;
                }
            }
            return comments_vms;
        }


        public async Task<List<Comment>> GetAllAsync()
        {
            return _commentRepository.GetAll().ToList();
        }

        public async Task<ServiceResponse> CanLeaveCommentAsync(CanLeaveCommentVM model)
        {
            var user = await _userRepository.GetUserByIdAsync(model.UserId.ToString());
            var product = await _productRepository.GetById(model.ProductId);
            
            if (user == null)
            {
                return new ServiceResponse()
                {
                    Message = "You are not authorizated",
                    Errors = new List<string>() { "You are not authorizated" }
                };
            }

            if (product == null)
            {
                return new ServiceResponse()
                {
                    Message = "Product does not exist",
                    Errors = new List<string>() { "Product does not exist" }
                };
            }

            var orders = _orderRepository.GetAll().Include(order=>order.OrderedProducts).Where(order => order.User.Id == user.Id).ToList();

            if(orders.Any())
            {
                var canLeaveComment = false;

                foreach(var order in orders)
                {
                    foreach(var prod in order.OrderedProducts)
                    {
                        if(prod.isBought == true && prod.canLeaveComment == true && prod.ProductId == model.ProductId)
                        {
                            canLeaveComment = true; break;
                        }
                    }
                }

                if(canLeaveComment)
                {
                    return new ServiceResponse()
                    {
                        Message = "You can leave comment",
                        IsSuccess= true,
                        Payload = true
                    };
                }
            }

            return new ServiceResponse()
            {
                Message = "You need to buy product first",
                IsSuccess = false,
                Payload = false
            };

        }
    }
}
