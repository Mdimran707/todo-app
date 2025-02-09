import axios from "axios";
const API_URL = "https://todo-app-backend-97pc.onrender.com";

export const getTodos = async () => await axios.get(API_URL);
export const addTodo = async (text) => await axios.post(API_URL, { text });
export const updateTodo = async (id, data) => await axios.put(`${API_URL}/${id}`, data);
export const deleteTodo = async (id) => await axios.delete(`${API_URL}/${id}`);

