using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public interface IEntity<T>
    {
        T Id { get; set; }
        string Name { get; set; }
        bool IsDelete { get; set; }
        DateTime DateCreated { get; set; }
    }

    public abstract class BaseEntity<T> : IEntity<T>
    {
        [Key]
        public T Id { get; set; }
        public string Name { get; set; }
        public bool IsDelete { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}

