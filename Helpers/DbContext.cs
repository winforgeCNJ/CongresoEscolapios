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

  public DbSet<PaymentTable> Payment { get; set; }
  public DbSet<PrePayment> PrePayment { get; set; }


  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<PaymentTable>()
        .Property(b => b.CreateDate)
        .HasDefaultValueSql("CURRENT_TIMESTAMP");

    modelBuilder.Entity<PaymentTable>()
        .Property(b => b.UpdateDate)
        .HasDefaultValueSql("CURRENT_TIMESTAMP")
        .ValueGeneratedOnAddOrUpdate();

    modelBuilder.Entity<PrePayment>()
      .Property(b => b.CreateDate)
      .HasDefaultValueSql("CURRENT_TIMESTAMP");

    modelBuilder.Entity<PrePayment>()
        .Property(b => b.UpdateDate)
        .HasDefaultValueSql("CURRENT_TIMESTAMP")
        .ValueGeneratedOnAddOrUpdate();
  }



}
