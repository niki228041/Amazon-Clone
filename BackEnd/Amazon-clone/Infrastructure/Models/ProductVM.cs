using DAL.Entities.FilterEntities;

namespace Infrastructure.Models;

public class ProductVM
{
    public int Id { get; set; }
    public string Name { get; set; }
    public float Price { get; set; }
    public int Discount { get; set; }
    public string Description { get; set; }
    public int Quantity { get; set; }
    public bool IsInTheStock { get; set; }
    public int SelledCount { get; set; }
    public int NumberOfDaysForDelivery { get; set; }
    public string Address { get; set; }
    public string Image { get; set; }
    public string Category { get; set; }
    public List<SelectedOptionVM> Options { get; set; }
    public List<CommentVM> Comments { get; set; }
}