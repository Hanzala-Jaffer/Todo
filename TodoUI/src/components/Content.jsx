import React, { useState, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import NewTodoItem from "./NewTodoItem";
import TodoItems from "./TodoItems";
import { getTodos } from "../api/todoService";

function Content({ categories, selectedCategory }) {
  const [todos, setTodos] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to fetch todos!", severity: "error" });
      }
    };
    loadTodos();
  }, []);

  const handleNewTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodos = (updatedTodos) => {
    setTodos(updatedTodos);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <NewTodoItem onTodoCreated={handleNewTodo} selectedCategory={selectedCategory} setSnackbar={setSnackbar} />
      <TodoItems todos={todos} selectedCategory={selectedCategory} updateTodos={updateTodos} categories={categories} setSnackbar={setSnackbar} />

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Content;