using System;
using TodoAPI.Models;

namespace TodoAPI.DAL.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IRepository<TodoItem> TodoItemRepository { get; }
    IRepository<Category> CategoryRepository { get; }
    Task SaveChangesAsync();
}
