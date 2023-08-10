using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Card : BaseEntity<int>
    {
        public string OwnerName { get; set; }
        public string CardNumber { get; set; }
        public string Year { get; set; }
        public string Month { get; set; }
        public bool IsDefault { get; set; }


        //Foreign keys:
        //Every Card have a User
        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }
    }
}
