using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class AddUserToCompanyDTO
    {
        public int UserId { get; set; }
        public int CompanyId { get; set; }
    }
}
