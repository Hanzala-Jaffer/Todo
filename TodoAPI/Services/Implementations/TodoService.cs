using System;
using TodoAPI.DAL.Interfaces;
using TodoAPI.Models;
using TodoAPI.Services.Interfaces;

namespace TodoAPI.Services.Implementations;

public class TodoService: ITodoService
{
    private readonly IUnitOfWork _unitOfWork;

    public TodoService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;   
    }

    public async Task<ServiceResponse> GetAllTodoItemsAsync()
    {
        ServiceResponse res = new ServiceResponse();
        try
        {
            var todoItems = await _unitOfWork.TodoItemRepository.GetAllAsync();
            res.Data = todoItems;
            res.IsSuccess = true;
        }catch(Exception ex)
        {
            // log the exception
            res.Message = "An error occurred while fetching the todo items.";
            res.IsSuccess = false;
        }
        return res;
    }

    // public async Task<TodoItem> GetTodoItemByIdAsync(int id)
    // {
    //     return await _unitOfWork.TodoItemRepository.GetByIdAsync(id);
    // }

    public async Task<ServiceResponse> AddTodoItemAsync(TodoItem todoItem)
    {
        ServiceResponse res = new ServiceResponse();
        try
        {
            var addedTodoItem = await _unitOfWork.TodoItemRepository.AddAsync(todoItem);
            res.Data = addedTodoItem;
            res.IsSuccess = true;
        }
        catch(Exception ex)
        {
            // log the exception
            res.Message = "An error occurred while adding the todo item.";
            res.IsSuccess = false;
        }
        return res;
    }

    public async Task<ServiceResponse> UpdateTodoItemAsync(TodoItem todoItem)
    {
        ServiceResponse res = new ServiceResponse();
        try
        {
            var updatedTodoItem = await _unitOfWork.TodoItemRepository.UpdateAsync(todoItem);
            res.Data = updatedTodoItem;
            res.IsSuccess = true;
        }
        catch(Exception ex)
        {
            // log the exception
            res.Message = "An error occurred while updating the todo item.";
            res.IsSuccess = false;
        }
        return res;
    }

    public async Task<ServiceResponse> DeleteTodoItemAsync(int id)
    {
        ServiceResponse res = new ServiceResponse();
        try
        {
            await _unitOfWork.TodoItemRepository.DeleteAsync(id);
            res.IsSuccess = true;
        }
        catch(Exception ex)
        {
            // log the exception
            res.Message = "An error occurred while deleting the todo item.";
            res.IsSuccess = false;
        }

        return res;
    }

    public async Task<ServiceResponse> GetCategoriesAsync()
    {
        ServiceResponse res = new ServiceResponse();
        try
        {
            var categories = await _unitOfWork.CategoryRepository.GetAllAsync();
            res.Data = categories;
            res.IsSuccess = true;
        }catch(Exception ex)
        {
            // log the exception
            res.Message = "An error occurred while fetching the categories.";
            res.IsSuccess = false;
        }
        return res;

    }

}
