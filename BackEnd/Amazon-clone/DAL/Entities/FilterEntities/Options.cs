using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.FilterEntities
{
    [Table("tblOptions")]
    public class Options : BaseEntity<int>
    {
        public string Title { get; set; }
        public bool isBaseOptions { get; set; } = false;
        public List<Variant> Variants { get; set; }
        public ICollection<OptionsCategory> OptionsCategories { get; set; }

    }
}
