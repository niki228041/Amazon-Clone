using DAL.Entities;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class AppEFContext : IdentityDbContext<User, RoleEntity, int,
        IdentityUserClaim<int>, UserRoleEntity, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public AppEFContext(DbContextOptions<AppEFContext> options) : base(options){}

        public DbSet<Address> Address { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<CommentImage> CommentImage { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductImage> ProductImage { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRoleEntity>(ur =>
            {
                ur.HasKey(u => new { u.UserId, u.RoleId });

                ur.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(r => r.RoleId)
                    .IsRequired();

                ur.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(r => r.UserId)
                    .IsRequired();
            });
            modelBuilder.Entity<Subcategory>(ur =>
            {
                ur.HasOne(c => c.Category)
                    .WithMany(s => s.Subcategories)
                    .HasForeignKey(c => c.Id)
                    .IsRequired();

            });
                


        }
      
    }
}
