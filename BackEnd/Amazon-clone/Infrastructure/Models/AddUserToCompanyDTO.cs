using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class AddUserToCompanyDTO
    {
        public string UserEmail { get; set; }
        public int CompanyId { get; set; }
    }
}
