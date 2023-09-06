using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities;

namespace DAL.FAQ
{
    public class FrequentlyAskedQuestion : BaseEntity<int>
    {
        public string Title { get; set; }
        public ICollection<AnswerToFAQ> AnswerToFAQ { get; set; }
    }
}
