using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblCategoryImages")]
    public class CategoryImage : BaseEntity<int>
    {

        //Foreign keys:

        //Every CategoryImage have a category
        public Category Category { get; set; }

        [ForeignKey(nameof(Category))]
        public int? CategoryId { get; set; }

    }
}


