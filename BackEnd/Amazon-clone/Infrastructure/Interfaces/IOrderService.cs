using DAL.Entities;
using Infrastructure.Models;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IOrderService
    {
        public Task<ServiceResponse> CloseAnOrderByIdAsync(int id);
        public List<Order> GetAllOrdersAsync();
        public Task<OrderVM> AddOrderAsync(OrderDTO model);
        public List<Order> GetOrdersByUserIdAsync(int id);
        public List<OrderVM> GetOrdersByCompanyIdAsync(int id);
    }
}
