using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class EditCategoryDTO
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public List<int> OptionsIds { get; set; }
    }
}
