using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class CreateOptionsVM
    {
        public string Title { get; set; }
        public List<CreateVariant> Variants { get; set; }
    }
}
