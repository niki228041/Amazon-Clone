using DAL.Entities.FilterEntities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblCategories")]
    public class Category : BaseEntity<int>
	{
        public int? ParentId { get; set; }
        public Category Parent { get; set; }


        //Foreign keys:
        public ICollection<Product> Products { get; set; }
        public ICollection<Options> Options { get; set; } = new List<Options>();
        public ICollection<Category> Subcategories { get; set; } = new List<Category>();
    }
}

