using DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.FAQ
{
    public class AnswerToFAQ : BaseEntity<int>
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public FrequentlyAskedQuestion FrequentlyAskedQuestion { get; set; }

        [ForeignKey(nameof(FrequentlyAskedQuestion))]
        public int? FrequentlyAskedQuestionId { get; set; }
    }
}
