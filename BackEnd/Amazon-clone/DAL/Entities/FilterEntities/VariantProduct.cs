using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.FilterEntities
{
    [Table("tblVariantProduct")]
    public class VariantProduct : BaseEntity<int>
    {
        public virtual Variant Variant { get; set; }
        [ForeignKey(nameof(Variant))]
        public int? VariantId { get; set; }

        public virtual Product Product { get; set; }
        [ForeignKey(nameof(Product))]
        public int? ProductId { get; set; }
    }
}
