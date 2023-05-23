namespace Infrastructure.Models;

public class ProductVM
{
    public ProductVM()
    {
        
    }
    public int Price { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }
    public string? ShortDescription { get; set; }

    public string Manufacturer { get; set; }
    public string? Image { get; set; }
    public string? HTMLbody { get; set; }

    public string Category { get; set; }
}