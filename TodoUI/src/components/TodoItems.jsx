// components/TodoItems.jsx
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateTodo, deleteTodo } from '../api/todoService';
import EditTodoModal from './EditTodoModal';

function TodoItems({ todos, selectedCategory, updateTodos, categories }) {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Filter todos whenever todos or selectedCategory changes
  useEffect(() => {
    if (selectedCategory && selectedCategory.id) {
      setFilteredTodos(
        todos.filter(todo => todo.categoryId === selectedCategory.id)
      );
    } else {
      // if no category is selected, show all todos
      setFilteredTodos(todos);
    }
  }, [todos, selectedCategory]);

  const completeTodo = async (event, todoId) => {
    const updatedValue = event.target.checked;
    const updatedTodo = todos.find(todo => todo.id === todoId);
    if (!updatedTodo) return;
    updatedTodo.isComplete = updatedValue;

    // Update state with a new array so React detects the change
    const newTodos = todos.map(todo => todo.id === todoId ? { ...updatedTodo } : todo);
    updateTodos(newTodos);
    
    try {
      await updateTodo(todoId, updatedTodo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      // Update the todos list after deletion
      updateTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (todoId) => {
    const todoToEdit = todos.find(todo => todo.id === todoId);
    setEditingTodo(todoToEdit);
    setEditModalOpen(true);
  };

  const handleEditSave = async (editedTodo) => {
    // Update todo on the server
    try {
      await updateTodo(editedTodo.id, editedTodo);
      // Update local state: map through todos and replace the edited one
      const newTodos = todos.map(todo => todo.id === editedTodo.id ? editedTodo : todo);
      updateTodos(newTodos);
    } catch (error) {
      console.error(error);
    }
    setEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <List>
        {filteredTodos.map((todo) => (
          <ListItem 
            key={todo.id} 
            divider
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleEditClick(todo.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <Checkbox 
              checked={todo.isComplete} 
              onChange={(e) => completeTodo(e, todo.id)}
            />
            <ListItemText primary={todo.description} />
          </ListItem>
        ))}
      </List>

      <EditTodoModal 
        open={editModalOpen} 
        todo={editingTodo} 
        categories={categories || []} 
        onClose={handleEditCancel} 
        onSave={handleEditSave} 
      />
    </>
  );
}

export default TodoItems;