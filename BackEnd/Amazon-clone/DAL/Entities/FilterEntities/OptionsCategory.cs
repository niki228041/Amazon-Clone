using DAL.Entities.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.FilterEntities
{
    [Table("tblOptionCategory")]
    public class OptionsCategory : BaseEntity<int>
    {
        public virtual Category Category { get; set; }
        [ForeignKey(nameof(Category))]
        public int? CategoryId { get; set; }

        public virtual Options Options { get; set; }
        [ForeignKey(nameof(Options))]
        public int? OptionsId { get; set; }
    }
}
