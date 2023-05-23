using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL_.Entities
{

    [Table("tblProducts")]
    public class ProductEntity : BaseEntity<int>
    {

        [Required] public int Price { get; set; }

        [Required, StringLength(1500)] public string Description { get; set; }
        [Required, StringLength(255)] public string? ShortDescription { get; set; }

        [Required, StringLength(255)] public string Manufacturer { get; set; }
        [StringLength(255)] public string? Image { get; set; }
        [StringLength(1024)] public string? HTMLbody { get; set; }

        public CategoryEntity Category { get; set; }
    }
}
