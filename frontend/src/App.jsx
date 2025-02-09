import { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";

function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        getTodos().then(res => setTodos(res.data));
    }, []);

    const handleAdd = async () => {
        if (!text.trim()) return;
        const res = await addTodo(text);
        setTodos([...todos, res.data]);
        setText("");
    };

    const handleToggle = async (id, completed) => {
        const res = await updateTodo(id, { completed: !completed });
        setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-10 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4">MERN To-Do List</h1>
            <div className="flex gap-2 mb-4">
                <input 
                    className="p-2 text-black"
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a task..."
                />
                <button className="bg-blue-500 p-2 rounded" onClick={handleAdd}>Add</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id} className="flex justify-between w-64 p-2 bg-gray-700 rounded mb-2">
                        <span 
                            className={todo.completed ? "line-through" : ""}
                            onClick={() => handleToggle(todo._id, todo.completed)}
                        >
                            {todo.text}
                        </span>
                        <button className="text-red-500" onClick={() => handleDelete(todo._id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

