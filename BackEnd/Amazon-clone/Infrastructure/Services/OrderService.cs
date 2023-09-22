using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using MailKit.Search;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.X509;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderedProductRepository _orderedProductRepository;
        private readonly IUserRepository _userRepository;
        private readonly ICardRepository _cardRepository;
        private readonly IProductImageService _productImageService;
        
        private readonly EmailService _emailService;


        private readonly IMapper _mapper;
        public OrderService(IMapper mapper, IOrderRepository orderRepository,IOrderedProductRepository orderedProductRepository, EmailService emailService, IUserRepository userRepository, ICardRepository cardRepository, IProductImageService productImageService)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
            _orderedProductRepository = orderedProductRepository;
            _emailService = emailService;
            _userRepository = userRepository;
            _cardRepository = cardRepository;
            _productImageService = productImageService;
        }

        public async Task<OrderVM> AddOrderAsync(OrderDTO model)
        {
            var order = _mapper.Map<OrderDTO, Order>(model);
            order.isBought = false;
            await _orderRepository.Create(order);

            foreach (var orderedProdct_tmp in model.OrderedProducts_)
            {
                var orderedProduct = _mapper.Map<OrderedProductDTO, OrderedProduct>(orderedProdct_tmp);
                orderedProduct.OrderId = order.Id;
                orderedProduct.canLeaveComment = true;

                await _orderedProductRepository.Create(orderedProduct);
            }

            //await _orderRepository.Update(order);
            var orderVm = _mapper.Map<Order, OrderVM>(order);

            var user = await _userRepository.GetUserByIdAsync(model.UserId.ToString()); 

            await _emailService.SendEmailAsync(user.Email, "THANK YOU FOR YOUR PURCHASE", "</div><h1>Your order id:" + order.Id +"</h1>" + 
                "<p>" +
                "You can check your order status in your profile" +
                "</p>" +
                "<p>" +
                "If you have any questions write us: allmarkt@gmail.com" +
                "</p></div>");

            return orderVm;
        }

        public List<Order> GetAllOrdersAsync()
        {
            return _orderRepository.GetAll().ToList();
        }

        public async Task<List<OrderVM>> GetOrdersByUserIdAsync(int id)
        {
           var orders = _orderRepository.GetAll()
            .Where(order=>order.UserId == id)
            .Include(order => order.OrderedProducts)
                .ThenInclude(orderedProduct => orderedProduct.Product) // Include the related products
            .ToList();

            foreach (var order in orders)
            {
                var canCloseOrder = true;

                foreach (var orderedProduct_ in order.OrderedProducts)
                {
                    if (!orderedProduct_.isBought)
                    {
                        canCloseOrder = false;
                    }
                }

                if (canCloseOrder)
                {
                    order.isBought = true;
                }
                else
                {
                    order.isBought = false;
                }
            }


            var orderVMs = new List<OrderVM>();

            foreach (var order in orders)
            {
                //var card = await _cardRepository.GetById((int)order.CardId);
                //tmpOrder.UserName = card.OwnerName;

                var tmpOrder = _mapper.Map<Order, OrderVM>(order);

                var user = await _userRepository.GetUserByIdAsync(order.UserId.ToString());
                tmpOrder.UserName = user.DisplayName;

                foreach (var item in order.OrderedProducts)
                {
                    

                    if (tmpOrder.Products == null) { tmpOrder.Products = new List<OrderedProductUpdatedVM>(); }

                    var ordered = new OrderedProductUpdatedVM
                    {
                        isBought = item.isBought,
                        Count = item.Count,
                        Id = item.Id,
                        Product = _mapper.Map<Product, ProductVM>(item.Product),
                    };


                    if (item.ProductId != null)
                    {
                        var image = await _productImageService.GetMainImageByIdAsync((int)item.ProductId);
                        var url = $@"https://amazonclone.monster/api/images/{image.Name + "_" + (int)Qualities.QualitiesSelector.LOW + ".jpg"}";
                        ordered.Product.Image = url;
                    }

                    tmpOrder.Products.Add(ordered);
                }
                orderVMs.Add(tmpOrder);

            }

            return orderVMs;
        }

        public async Task<ServiceResponse> GetOrdersByCompanyIdWithPaginationAsync(GetOrdersByCompanyIdWithPaginationDTO model)//
        {
            var orders = _orderRepository.GetAll()
            .Include(order=>order.Card)
            .Include(order=>order.Address)
            .Include(order => order.OrderedProducts)
                .ThenInclude(orderedProduct => orderedProduct.Product) // Include the related products
            .ToList();

            if(!orders.Any())
            {
                return new ServiceResponse()
                {
                    Message = "У вас немає замовлень",
                    IsSuccess = false
                };
            }

            var selectedOrders = new List<Order>();

            foreach (var order in orders)
            {
                var canCloseOrder = true;

                foreach (var orderedProduct_ in order.OrderedProducts)
                {
                    if (!orderedProduct_.isBought)
                    {
                        canCloseOrder = false;
                    }
                    
                }

                if (canCloseOrder)
                {
                    order.isBought = true;
                }
                else
                {
                    order.isBought = false;
                }
            }

            foreach (var order in orders)
            {
                var selectedProducts = new List<OrderedProduct>();
                var orderedProductsList = order.OrderedProducts.ToList();

                for (int i = 0; i < orderedProductsList.Count; i++)
                {
                    if (orderedProductsList[i].ProductId != null)
                    if (orderedProductsList[i].Product.CompanyId== model.Id)
                    {
                        selectedProducts.Add(orderedProductsList[i]);
                    }
                }

                if(selectedProducts.Count>0) {
                    order.OrderedProducts = selectedProducts;
                    
                    if(!order.isBought)
                    selectedOrders.Add(order);
                }
            }

            var selectedOrdersUpdated = new List<OrderVM>();

            var orderVMs = new List<OrderVM>();

            foreach (var order in selectedOrders)
            {
                var tmpOrder = _mapper.Map<Order, OrderVM>(order);
                var address = _mapper.Map<Address,AddressVM>(order.Address);
                var card = _mapper.Map< Card, CardVM>(order.Card);
                tmpOrder.Address = address;
                tmpOrder.Card = card;

                var user = await _userRepository.GetUserByIdAsync(order.UserId.ToString());
                tmpOrder.UserName = user.DisplayName;

                foreach (var item in order.OrderedProducts)
                {
                    if (tmpOrder.Products == null) { tmpOrder.Products = new List<OrderedProductUpdatedVM>(); }

                    var image = await _productImageService.GetMainImageByIdAsync((int)item.ProductId);
                    var url = $@"https://amazonclone.monster/api/images/{image.Name + "_" + (int)Qualities.QualitiesSelector.LOW + ".jpg"}";

                    var productVm = _mapper.Map<Product, ProductVM>(item.Product);
                    productVm.Image = url;

                    tmpOrder.Products.Add(new OrderedProductUpdatedVM
                    {
                        isBought=item.isBought,
                        Count = item.Count,
                        Id= item.Id,
                        Product= productVm,
                    });

                    

                }
                orderVMs.Add(tmpOrder);

            }

            var page = model.Page;
            var limit = model.Limit;

            var startIndex = (page - 1) * limit;
            var endIndex = page * limit;


            var res = orderVMs
                .Skip(startIndex)
                .Take(limit)
                .ToList();

            OrdersWithPagination ordersWithPagination = new OrdersWithPagination();
            ordersWithPagination.Orders = res;
            ordersWithPagination.Total = orderVMs.Count;

            return new ServiceResponse()
            {
                Message="Замовлення за ід компанії",
                Payload= ordersWithPagination,
                IsSuccess=true
            };
        }


        public async Task<ServiceResponse> CloseAnOrderedProductByIdAsync(int id)
        {
            var orderedProduct = await _orderedProductRepository.GetById(id);
            
            if (orderedProduct != null)
            {
                orderedProduct.isBought = true;
                await _orderedProductRepository.Update(orderedProduct);

                var order = _orderRepository.GetAll().Include(order=>order.OrderedProducts).FirstOrDefault(order=>order.OrderedProducts.FirstOrDefault(prod=>prod.Id == orderedProduct.Id) != null);
               

                return new ServiceResponse()
                {
                    Message = "OrderedProduct was closed"
                };
            }
            else
            {
                return new ServiceResponse()
                {
                    Message = "this OrderedProduct does'nt exist",
                    Errors = new List<string>() { "this OrderedProduct does'nt exist" }
                };
            }

        }
    }
}
