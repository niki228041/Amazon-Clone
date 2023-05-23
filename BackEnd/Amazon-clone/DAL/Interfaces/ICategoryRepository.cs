
using DAL.Entities;

namespace DAL.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<CategoryEntity, int>
    {
        IQueryable<CategoryEntity> Categories { get; }
    }
}
