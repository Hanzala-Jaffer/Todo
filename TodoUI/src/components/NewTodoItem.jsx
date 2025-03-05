import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createTodo } from "../api/todoService";

function NewTodoItem({ onTodoCreated, selectedCategory, setSnackbar }) {
  const [todoText, setTodoText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todoText.trim()) {
      setSnackbar({ open: true, message: "Todo description cannot be empty!", severity: "warning" });
      return;
    }

    const newTodoData = {
      description: todoText,
      categoryId: selectedCategory ? selectedCategory.id : null,
      isComplete: false,
      priority: 1,
      dueDate: new Date(),
    };

    try {
      const createdTodo = await createTodo(newTodoData);
      onTodoCreated(createdTodo);
      setTodoText("");
      setSnackbar({ open: true, message: "Todo added successfully!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Failed to add todo!", severity: "error" });
    }
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