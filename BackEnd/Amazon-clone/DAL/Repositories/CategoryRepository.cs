using DAL.Entities;
using DAL.Interfaces;

namespace DAL.Repositories
{
    public class CategoryRepository : GenericRepository<Category>,
        ICategoryRepository
    {
        public CategoryRepository(AppEFContext context) : base(context)
        {
        }

        public IQueryable<Category> Categories => GetAll();
        
    }
}
