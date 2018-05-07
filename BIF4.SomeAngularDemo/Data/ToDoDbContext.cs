using Microsoft.EntityFrameworkCore;

namespace BIF4.SomeAngularDemo.Data
{
    public class ToDoDbContext : DbContext
    {
        public DbSet<ToDoItem> ToDoItems { get; set; }

        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options)
        {
        }
    }
}