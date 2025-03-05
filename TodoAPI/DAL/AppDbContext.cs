using System;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Models;

namespace TodoAPI;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // DbSet properties for the tables
    public DbSet<TodoItem> TodoItems { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure table names if needed
        modelBuilder.Entity<TodoItem>().ToTable("tblTodoItem");
        modelBuilder.Entity<Category>().ToTable("tblCategory");

        // Seed initial data for Categories
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Work" },
            new Category { Id = 2, Name = "Personal" }
        );

        // Seed initial data for TodoItems
        modelBuilder.Entity<TodoItem>().HasData(
            new TodoItem
            {
                Id = 1,
                Description = "Prepare meeting agenda",
                DueDate = DateTime.Today.AddDays(1),
                CategoryId = 1, // "Work"
                Priority = 1,
                IsComplete = false
            },
            new TodoItem
            {
                Id = 2,
                Description = "Buy groceries",
                DueDate = DateTime.Today.AddDays(2),
                CategoryId = 2, // "Personal"
                Priority = 2,
                IsComplete = false
            }); 


    }
}
