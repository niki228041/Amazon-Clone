﻿using DAL.Entities;

namespace Infrastructure.Models;

public class CategoryVM
{
    public int Id { get; set; }   
    public string Name { get; set; }
    public List<CategoryVM> Subcategories { get; set; }
    public int ParentId { get; set; }
}