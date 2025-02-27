using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TodoAPI.Models;

public class TodoItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    public DateTime DueDate { get; set; }

    [ForeignKey("Category")]
    public int CategoryId { get; set; }

    public Category? Category { get; set; }

    public int Priority { get; set; }

    public bool IsComplete { get; set; } = false;
}
