using DAL.Entities;
using DAL.Entities.FilterEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IOptionsRepository : IGenericRepository<Options, int>
    {
        public Task RemoveOptionsForCategoryAsync(int categoryId);
        public Task AddOptionsToCategoryAsync(int categoryId, List<int> optionIds);
        public Task SaveChangesAsync();
    }
}
