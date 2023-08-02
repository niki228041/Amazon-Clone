using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.FilterEntities
{
    [Table("tblVariant")]
    public class Variant : BaseEntity<int>
    {
        public string Title { get; set; }



        public Options Options { get; set; }

        [ForeignKey(nameof(Options))]
        public int? OptionsId { get; set; }


        public virtual ICollection<VariantProduct> VariantProducts { get; set; }
    }
}
