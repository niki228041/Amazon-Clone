using DAL_.Entities;
using DAL_.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL_.Repositories
{
    public class CategoryRepository : GenericRepository<CategoryEntity>,
        ICategoryRepository
    {
        public CategoryRepository(AppEFContext context) : base(context)
        {
        }

        public IQueryable<CategoryEntity> Categories => GetAll();

    }
}
