// components/NewTodoItem.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createTodo } from '../api/todoService';

function NewTodoItem({ onTodoCreated, selectedCategory }) {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the new todo object. Adjust properties as needed.
    const newTodoData = {
      description: todoText,
      // Use the selected category if available
      categoryId: selectedCategory ? selectedCategory.id : null,
      // Set default values for other properties, like priority or isComplete
      isComplete: false,
      priority: 1,
      dueDate: new Date(),
    };

    try {
      const createdTodo = await createTodo(newTodoData);
      // Call the parent's callback to add the new todo to the list
      onTodoCreated(createdTodo);
    } catch (error) {
      console.error(error);
    }
    setTodoText('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={2} display="flex" gap={2}>
      <TextField
        label="New Todo"
        variant="outlined"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
}

export default NewTodoItem;