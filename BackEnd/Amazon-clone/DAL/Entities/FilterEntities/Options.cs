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
        public List<Variant> Variants { get; set; }
        public ICollection<Category> Categories { get; set; }

    }
}
