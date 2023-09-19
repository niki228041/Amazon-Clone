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
        public Task<ServiceResponse> CloseAnOrderedProductByIdAsync(int id);
        public List<Order> GetAllOrdersAsync();
        public Task<OrderVM> AddOrderAsync(OrderDTO model);
        public Task<List<OrderVM>> GetOrdersByUserIdAsync(int id);
        public Task<ServiceResponse> GetOrdersByCompanyIdWithPaginationAsync(GetOrdersByCompanyIdWithPaginationDTO id);
    }
}
