using DAL.Entities;
using DAL.Entities.FilterEntities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class OptionsRepository : GenericRepository<Options>, IOptionsRepository
    {
        public OptionsRepository(AppEFContext _dbContext) : base(_dbContext)
        {
        }

        public async Task RemoveOptionsForCategoryAsync(int categoryId)
        {
            var optionsToRemove = await _dbContext.OptionCategory
                .Where(optCat => optCat.CategoryId == categoryId)
                .ToListAsync();

            _dbContext.OptionCategory.RemoveRange(optionsToRemove);
        }

        public async Task AddOptionsToCategoryAsync(int categoryId, List<int> optionIds)
        {
            foreach (var optionId in optionIds)
            {
                var real_option = await _dbContext.Options.FindAsync(optionId);

                if (real_option != null)
                {
                    _dbContext.OptionCategory.Add(new OptionsCategory { CategoryId = categoryId, OptionsId = optionId });
                }
            }
        }

        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
