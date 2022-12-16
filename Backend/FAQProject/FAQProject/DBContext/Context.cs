using FAQProject.Entity;
using Microsoft.EntityFrameworkCore;

namespace FAQProject.DBContext
{
    public class Context : DbContext
    {
        public Context()
        {

        }

        public Context(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Question> Question { get; set; }
        public DbSet<Answer> Answer { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Department> Department { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()

                .HasOne(c => c.Parent)
                .WithMany(c => c.Children)
                .HasForeignKey(c => c.ParentId)  
                .IsRequired(false);

            base.OnModelCreating(modelBuilder);
        }
    }
}
