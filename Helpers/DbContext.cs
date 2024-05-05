using AppContext.Models;
using Microsoft.EntityFrameworkCore;

namespace AppContext;
public class AppDBContext : DbContext
{
  public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
  {
  }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    if (!optionsBuilder.IsConfigured)
    {
      optionsBuilder.UseNpgsql("name=ConnectionStrings:DefaultConnection");
    }
  }


  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Payment>()
        .Property(b => b.CreateDate)
        .HasDefaultValueSql("CURRENT_TIMESTAMP");

    modelBuilder.Entity<Payment>()
        .Property(b => b.UpdateDate)
        .HasDefaultValueSql("CURRENT_TIMESTAMP")
        .ValueGeneratedOnAddOrUpdate();
  }

  public DbSet<Payment> PaymentTable { get; set; }

}
