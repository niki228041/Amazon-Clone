using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblCompanies")]
    public class Company : BaseEntity<int>
	{
        public string Description { get; set; }
        public string Image { get; set; }

        //Every User have a company
        public User Creator { get; set; }

        [ForeignKey(nameof(Creator))]
        public int? CreatorId { get; set; }

        public ICollection<User> Users { get; set; }
        public ICollection<Product> Products { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}

