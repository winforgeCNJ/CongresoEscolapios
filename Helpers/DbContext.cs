using AppContext.Models;
using Microsoft.EntityFrameworkCore;

namespace AppContext;

public class AppDBContext(DbContextOptions<AppDBContext> options) : DbContext(options)
{

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    if (!optionsBuilder.IsConfigured)
    {
      optionsBuilder.UseNpgsql("name=ConnectionStrings:DefaultConnection");
    }
  }

  public DbSet<Payment> PaymentTable { get; set; }

}
