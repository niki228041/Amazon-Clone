using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
	public class Subcategory
	{
        public int Id { get; set; }

        public string Name { get; set; }

        [ForeignKey(nameof(Category))]
        public int? CategoryId { get; set; }

        public Subcategory Category { get; set; } = null;
        public virtual ICollection<Product> Products { get; set; }
    }
}

