import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Checkbox, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateTodo, deleteTodo } from "../api/todoService";
import EditTodoModal from "./EditTodoModal";

function TodoItems({ todos, selectedCategory, updateTodos, categories, setSnackbar }) {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    let sortedTodos = todos;

    if (selectedCategory && selectedCategory.id) {
      sortedTodos = todos.filter((todo) => todo.categoryId === selectedCategory.id);
    }

    // Sort by priority (lower numbers first)
    sortedTodos = sortedTodos.sort((a, b) => a.priority - b.priority);

    setFilteredTodos(sortedTodos);
  }, [todos, selectedCategory]);

  const completeTodo = async (event, todoId) => {
    const updatedValue = event.target.checked;
    const updatedTodo = todos.find((todo) => todo.id === todoId);
    if (!updatedTodo) return;
    updatedTodo.isComplete = updatedValue;

    const newTodos = todos.map((todo) => (todo.id === todoId ? { ...updatedTodo } : todo));
    updateTodos(newTodos);

    try {
      await updateTodo(todoId, updatedTodo);
      setSnackbar({ open: true, message: "Todo updated successfully!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to update todo!", severity: "error" });
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      updateTodos(todos.filter((todo) => todo.id !== todoId));
      setSnackbar({ open: true, message: "Todo deleted!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to delete todo!", severity: "error" });
    }
  };

  const handleEditClick = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setEditingTodo(todoToEdit);
    setEditModalOpen(true);
  };

  const handleEditSave = async (editedTodo) => {
    try {
      await updateTodo(editedTodo.id, editedTodo);
      const newTodos = todos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo));
      updateTodos(newTodos);
      setSnackbar({ open: true, message: "Todo edited successfully!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to edit todo!", severity: "error" });
    }
    setEditModalOpen(false);
  };

  return (
    <>
      <List>
        {filteredTodos.map((todo) => (
          <ListItem key={todo.id} divider secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEditClick(todo.id)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <Checkbox checked={todo.isComplete} onChange={(e) => completeTodo(e, todo.id)} />
            <ListItemText primary={todo.description} />
          </ListItem>
        ))}
      </List>

      <EditTodoModal 
        open={editModalOpen} 
        todo={editingTodo} 
        categories={categories || []} 
        onClose={() => setEditModalOpen(false)} 
        onSave={handleEditSave} 
      />
    </>
  );
}

export default TodoItems;