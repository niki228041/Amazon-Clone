using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblOrders")]
    public class Order : BaseEntity<int>
	{
        public string FullName { get; set; }
        public bool isBought { get; set; } = false;
        public float Price { get; set; }

        //Foreigen Keys:
        //Every order have a user
        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }
            

            //Every order have a user
        public Card Card { get; set; }

        [ForeignKey(nameof(Card))]
        public int? CardId { get; set; }

        
            //Every order have a address
        public Address Address { get; set; }

        [ForeignKey(nameof(Address))]
        public int? AddressId { get; set; }

        public ICollection<OrderedProduct> OrderedProducts { get; set; }
    }
}

