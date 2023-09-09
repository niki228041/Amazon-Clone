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
        public int CountOfProducts { get; set; }
        public Category Parent { get; set; }

        public CategoryImage CategoryImage { get; set; }

        [ForeignKey(nameof(CategoryImage))]
        public int? CategoryImageId { get; set; }

        //Foreign keys:
        public ICollection<Product> Products { get; set; }
        public ICollection<OptionsCategory> OptionsCategories { get; set; } = new List<OptionsCategory>();
        public ICollection<Category> Subcategories { get; set; } = new List<Category>();
        
    }
}

