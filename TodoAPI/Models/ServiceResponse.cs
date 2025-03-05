using System;

namespace TodoAPI.Models;

public class ServiceResponse
{
    public bool IsSuccess { get; set; } 
    public string Message { get; set; }
    public object? Data { get; set; }
}
