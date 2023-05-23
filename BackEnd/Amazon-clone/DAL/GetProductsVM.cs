namespace Infrastructure.Models;

public class GetProductsVM
{
    public int pageNumber { get; set; }
    public int pageSize { get; set; }
    public string Category { get; set; }
    public string? Find { get; set; }
}