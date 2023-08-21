using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class OrderedProductRepository : GenericRepository<OrderedProduct>, IOrderedProductRepository
    {
        public OrderedProductRepository(AppEFContext context) : base(context)
        {
        }
    }
}
