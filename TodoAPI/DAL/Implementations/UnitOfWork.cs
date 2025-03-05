using System;
using TodoAPI.DAL.Interfaces;
using TodoAPI.Models;

namespace TodoAPI.DAL.Implementations;

public class UnitOfWork: IUnitOfWork
{
    private readonly AppDbContext _context;
    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }
    public IRepository<TodoItem> TodoItemRepository => new Repository<TodoItem>(_context);
    public IRepository<Category> CategoryRepository => new Repository<Category>(_context);


    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    public void Dispose()
    {
        _context.Dispose();
    }
}
