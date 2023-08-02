using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using MailKit.Search;
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
        private readonly EmailService _emailService;


        private readonly IMapper _mapper;
        public OrderService(IMapper mapper, IOrderRepository orderRepository,IOrderedProductRepository orderedProductRepository, EmailService emailService, IUserRepository userRepository)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
            _orderedProductRepository = orderedProductRepository;
            _emailService = emailService;
            _userRepository = userRepository;
        }

        public async Task<OrderVM> AddOrderAsync(OrderDTO model)
        {
            var order = _mapper.Map<OrderDTO, Order>(model);
            await _orderRepository.Create(order);

            foreach (var orderedProdct_tmp in model.OrderedProducts)
            {
                var orderedProduct = _mapper.Map<OrderedProductDTO, OrderedProduct>(orderedProdct_tmp);
                orderedProduct.OrderId = order.Id;
                await _orderedProductRepository.Create(orderedProduct);
            }

            await _orderRepository.Update(order);
            var orderVm = _mapper.Map<Order, OrderVM>(order);

            var user = await _userRepository.GetUserByIdAsync(model.UserId.ToString()); 

            await _emailService.SendEmailAsync(user.Email, "THANK YOU FOR YOUR PURCHASE", "</div><h1>Your order id:" + order.Id +"</h1>" + 
                "<p>" +
                "You can check your order status in your profile" +
                "<p>" +
                "<p>" +
                "If you have any questions write us: allmarkt@gmail.com" +
                "</p></div>");

            return orderVm;
        }

        public List<Order> GetAllOrdersAsync()
        {
            return _orderRepository.GetAll().ToList();
        }

        public List<Order> GetOrdersByUserIdAsync(int id)
        {
           return _orderRepository.GetAll().Where(order=>order.UserId == id).ToList();
        }

        
    }
}
