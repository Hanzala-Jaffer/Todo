using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAPI.Models;
using TodoAPI.Services.Interfaces;

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<ActionResult> GetAllTodos()
        {
            var res = await _todoService.GetAllTodoItemsAsync();
            if(!res.IsSuccess)
            {
                return StatusCode(500, res);
            }
            return Ok(res.Data);
        }

        // POST: api/todo
        [HttpPost]
        public async Task<ActionResult> CreateTodo(TodoItem todoItem)
        {
            var res = await _todoService.AddTodoItemAsync(todoItem);
            if(!res.IsSuccess)
            {
                return StatusCode(500, res);
            }
            return CreatedAtAction(nameof(GetAllTodos), new { id = todoItem.Id }, res.Data);
        }

        // PUT: api/todo/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, TodoItem updatedTodo)
        {
            var res = await _todoService.UpdateTodoItemAsync(updatedTodo);
            if(!res.IsSuccess)
            {
                return StatusCode(500, res);
            }
            return Ok(res.Data);
        }

        // DELETE: api/todo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var res = await _todoService.DeleteTodoItemAsync(id);
            if(!res.IsSuccess)
            {
                return StatusCode(500, res);
            }
            return NoContent();
        }
        // GET: api/todo/categories
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategories()
        {
            var res =  await _todoService.GetCategoriesAsync();
            if(!res.IsSuccess)
            {
                return StatusCode(500, res);
            }
            return Ok(res.Data);
        }
    }
}
