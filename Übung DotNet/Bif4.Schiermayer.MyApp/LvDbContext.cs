using Microsoft.EntityFrameworkCore;

namespace Bif4.Schiermayer.MyApp
{
    public class LvDbContext : DbContext
    {
        public LvDbContext(DbContextOptions<LvDbContext> options) : base(options)
        {
        }

        public DbSet<Lehrveranstaltung> Lehrveranstaltungen { get; set; }
    }
}
