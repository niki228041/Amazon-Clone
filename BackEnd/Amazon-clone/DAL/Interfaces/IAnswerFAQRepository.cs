using DAL.Entities;
using DAL.FAQ;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IAnswerFAQRepository : IGenericRepository<AnswerToFAQ, int>
    {

    }
}
