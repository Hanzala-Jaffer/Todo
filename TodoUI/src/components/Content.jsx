import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import NewTodoItem from './NewTodoItem';
import TodoItems from './TodoItems';
import { getTodos } from "../api/todoService";

function Content({ categories, selectedCategory }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadTodos();
  }, []);

  // Function to add a new todo to the state
  const handleNewTodo = (newTodo) => {
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodos = (updatedTodos) => {
    setTodos(updatedTodos);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {/* <Typography variant="h4" gutterBottom>
        Todo App {selectedCategory ? `- ${selectedCategory.name}` : ''}
      </Typography> */}
      <NewTodoItem onTodoCreated={handleNewTodo} selectedCategory={selectedCategory} />
      <TodoItems todos={todos} selectedCategory={selectedCategory} updateTodos={updateTodos} categories={categories}/>
    </Container>
  );
}

export default Content;