using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class AnswerFAQDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int FrequentlyAskedQuestionId { get; set; }
    }
}
