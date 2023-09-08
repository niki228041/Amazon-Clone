using DAL.Entities;
using DAL.FAQ;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class FAQRepository : GenericRepository<FrequentlyAskedQuestion>, IFAQRepository
    {
        public FAQRepository(AppEFContext context) : base(context)
        {
        }
    }
}
