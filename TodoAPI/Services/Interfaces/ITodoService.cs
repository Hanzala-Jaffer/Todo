using System;
using TodoAPI.Models;

namespace TodoAPI.Services.Interfaces;

public interface ITodoService
{
    Task<ServiceResponse> GetAllTodoItemsAsync();
    // Task<TodoItem> GetTodoItemByIdAsync(int id);
    Task<ServiceResponse> AddTodoItemAsync(TodoItem todoItem);
    Task<ServiceResponse> UpdateTodoItemAsync(TodoItem todoItem);
    Task<ServiceResponse> DeleteTodoItemAsync(int id);
    Task<ServiceResponse> GetCategoriesAsync();

}
