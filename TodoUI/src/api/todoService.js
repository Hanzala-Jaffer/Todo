// Using axios (if installed)
import axios from "axios";

const API_BASE_URL = "http://localhost:5132/api/todo"; 
// const API_BASE_URL = "https://todoapphanzala.azurewebsites.net/api/todo"; 


export const getTodos = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const createTodo = async (todoItem) => {
  try {
    const response = await axios.post(API_BASE_URL, todoItem);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};