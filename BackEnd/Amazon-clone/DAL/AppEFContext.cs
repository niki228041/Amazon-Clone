using DAL.Entities;
using DAL.Entities.FilterEntities;
using DAL.Entities.Identity;
using DAL.Entities.Music;
using DAL.FAQ;
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
        public DbSet<CategoryImage> CategoryImage { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<CommentImage> CommentImage { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductImage> ProductImage { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }
        public DbSet<Track> Track { get; set; }
        public DbSet<TrackGenre> TrackGenre { get; set; }
        public DbSet<Genre> Genre { get; set; }
        public DbSet<Album> Album { get; set; }
        public DbSet<TrackAlbum> TrackAlbum { get; set; }
        public DbSet<Options> Options { get; set; }
        public DbSet<Variant> Variant { get; set; }
        public DbSet<OptionsCategory> OptionCategory { get; set; }
        public DbSet<VariantProduct> VariantProduct { get; set; }
        public DbSet<Card> Card { get; set; }
        public DbSet<OrderedProduct> OrderedProducts { get; set; }
        public DbSet<LikedTracks> LikedTracks { get; set; }
        public DbSet<TrackHistory> TrackHistory { get; set; }
        public DbSet<FrequentlyAskedQuestion> FrequentlyAskedQuestion { get; set; }
        public DbSet<AnswerToFAQ> AnswerToFAQ { get; set; }
        public DbSet<UserFollower> UserFollower { get; set; }

        
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

            //START Many to many
            modelBuilder.Entity<OptionsCategory>()
                .HasOne(t => t.Options)
                .WithMany(c => c.OptionsCategories)
                .OnDelete(DeleteBehavior.Cascade);

            
            modelBuilder.Entity<OptionsCategory>()
                .HasOne(t => t.Category)
                .WithMany(c => c.OptionsCategories)
                .OnDelete(DeleteBehavior.Cascade);
            //END


            //START Many to one
            modelBuilder.Entity<Options>()
                .HasMany(categ => categ.Variants)
                .WithOne(prod => prod.Options)
                .HasForeignKey(prod => prod.OptionsId)
                .OnDelete(DeleteBehavior.Cascade);
            //END


            //START Many to many
            modelBuilder.Entity<VariantProduct>()
                .HasOne(vp => vp.Variant)
                .WithMany(prod => prod.VariantProducts)
                .OnDelete(DeleteBehavior.Cascade);


            //START Many to one
            modelBuilder.Entity<Category>()
                .HasMany(categ => categ.Products)
                .WithOne(prod => prod.Category)
                .HasForeignKey(prod => prod.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
            //END

            ////START One to one
            //modelBuilder.Entity<Category>()
            //    .HasOne(c => c.CategoryImage)
            //    .WithOne()
            //    .HasForeignKey<Category>(c => c.CategoryImageId);
            ////END

            //START Many to many
            modelBuilder.Entity<VariantProduct>()
                .HasOne(vp => vp.Variant)
                .WithMany(prod => prod.VariantProducts)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<VariantProduct>()
                .HasOne(vp => vp.Product)
                .WithMany(c => c.VariantProducts)
                .OnDelete(DeleteBehavior.Cascade);
            //END




            //START Many to one
            modelBuilder.Entity<User>()
                .HasMany(user => user.Addresses)
                .WithOne(adr => adr.User)
                .HasForeignKey(adr => adr.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            //END


            //START Many to one
            modelBuilder.Entity<Product>()
                .HasMany(prod => prod.ProductImages)
                .WithOne(img => img.Product)
                .HasForeignKey(prod => prod.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
            //END

            //START Many to many

            modelBuilder.Entity<OrderedProduct>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderedProducts)
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<OrderedProduct>()
                .HasOne(op => op.Product)
                .WithMany(p => p.OrderedProducts)
                .HasForeignKey(op => op.ProductId);
            //END

            //START Many to many
            modelBuilder.Entity<UserFollower>()
                .HasOne(uf => uf.User)
                .WithMany(u => u.Followers)
                .HasForeignKey(uf => uf.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserFollower>()
                .HasOne(uf => uf.Follower)
                .WithMany(u => u.Following)
                .HasForeignKey(uf => uf.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);
            //END


            //START Many to one
            modelBuilder.Entity<Company>()
                .HasMany(comp => comp.Users)
                .WithOne(user => user.Company)
                .HasForeignKey(user => user.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);
            //END

            //START Many to many
            modelBuilder.Entity<LikedTracks>()
                .HasOne(lt => lt.Track)
                .WithMany(tr => tr.LikedTracks)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<LikedTracks>()
                .HasOne(lt => lt.User)
                .WithMany(us => us.LikedTracks)
                .OnDelete(DeleteBehavior.Cascade);
            //END

            //START Many to many
            modelBuilder.Entity<TrackHistory>()
                .HasOne(lt => lt.Track)
                .WithMany(tr => tr.TrackHistory)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<TrackHistory>()
                .HasOne(lt => lt.User)
                .WithMany(us => us.TrackHistory)
                .OnDelete(DeleteBehavior.Cascade);
            //END

            //START Many to many
            modelBuilder.Entity<TrackGenre>()
                .HasOne(tr => tr.Track)
                .WithMany(trg => trg.TrackGenre)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<TrackGenre>()
                .HasOne(gn => gn.Genre)
                .WithMany(trg => trg.TrackGenre)
                .OnDelete(DeleteBehavior.Cascade);
            //END

            //START Many to one
            modelBuilder.Entity<Track>()
                .HasMany(track => track.TrackComments)
                .WithOne(com => com.Track)
                .HasForeignKey(com => com.TrackId)
                .OnDelete(DeleteBehavior.Cascade);
            //END

            //START Many to one
            modelBuilder.Entity<FrequentlyAskedQuestion>()
                .HasMany(track => track.AnswerToFAQ)
                .WithOne(com => com.FrequentlyAskedQuestion)
                .HasForeignKey(com => com.FrequentlyAskedQuestionId)
                .OnDelete(DeleteBehavior.Cascade);
            //END


            //START Many to many
            modelBuilder.Entity<TrackAlbum>()
                .HasOne(vp => vp.Track)
                .WithMany(prod => prod.TrackAlbums)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<TrackAlbum>()
                .HasOne(vp => vp.Album)
                .WithMany(c => c.TrackAlbums)
                .OnDelete(DeleteBehavior.Cascade);
            //END

            ////START Many to one
            //modelBuilder.Entity<Category>()
            //.HasMany(cat => cat.Subcategories)
            //.WithOne()
            //.HasForeignKey(cat => cat.ParentId)
            //.OnDelete(DeleteBehavior.Cascade);
            ////END
        }

    }
}
