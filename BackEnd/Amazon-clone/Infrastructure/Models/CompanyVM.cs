using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class CompanyVM
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<AllUsersVM> Users { get; set; }
    }
}
