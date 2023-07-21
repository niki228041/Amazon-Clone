using DAL.Entities.FilterEntities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class VariantRepository: GenericRepository<Variant>,IVariantRepository
    {
        public VariantRepository(AppEFContext context) : base(context)
        {
        }
    }
}
