import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todoService";

function TestApp() {
  const [todos, setTodos] = useState([]);
  const [newTodoDescription, setNewTodoDescription] = useState("");

  // Fetch all todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodoDescription.trim() === "") return;

    const newTodo = {
      description: newTodoDescription,
      dueDate: new Date(), // for example purposes; update as needed
      categoryId: 1, // remove hard coding 
      priority: 1
    };

    try {
      const createdTodo = await createTodo(newTodo);
      setTodos((prev) => [...prev, createdTodo]);
      setNewTodoDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Simple UI
  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodoDescription}
        onChange={(e) => setNewTodoDescription(e.target.value)}
        placeholder="New todo description"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.description} - {new Date(todo.dueDate).toLocaleDateString()}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            {/* For update, you could add a button that triggers an edit UI */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestApp;