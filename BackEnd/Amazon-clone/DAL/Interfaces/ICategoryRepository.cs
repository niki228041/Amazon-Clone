
using DAL.Entities;

namespace DAL.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<Category, int>
    {
        IQueryable<Category> Categories { get; }
    }
}
