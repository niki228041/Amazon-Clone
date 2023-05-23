using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    [Table("tblCategories")]
    public class CategoryEntity : BaseEntity<int>
    {
     
        [StringLength(255)]
        public string Image { get; set; }
        public virtual ICollection<ProductEntity> Products { get; set; }
    }
}
