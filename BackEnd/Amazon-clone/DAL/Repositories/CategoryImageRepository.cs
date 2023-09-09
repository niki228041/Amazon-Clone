using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CategoryImageRepository : GenericRepository<CategoryImage>, ICategoryImageRepository
    {
        public CategoryImageRepository(AppEFContext context) : base(context)
        {


        }

        public IQueryable<CategoryImage> CategoryImage => GetAll();
    }
}
