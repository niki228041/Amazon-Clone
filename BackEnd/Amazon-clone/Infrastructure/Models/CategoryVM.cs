using DAL.Entities;
using DAL.Entities.DTO_s;

namespace Infrastructure.Models;

public class CategoryVM
{
    public int Id { get; set; }
    public int CountOfProducts { get; set; }
    public string Name { get; set; }
    public List<CategoryVM> Subcategories { get; set; }
    public List<OptionsVM> Options { get; set; }
    public int ParentId { get; set; }
    public string Images_ { get; set; }
}