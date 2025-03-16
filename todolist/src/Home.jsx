import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

function Home() {
    const [Todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get('http://localhost:3001/');
            setTodos(res.data.map(todo => todo.task));
        } catch (err) {
            console.error('Error fetching todos:', err);
        }
    };

    const handleAdd = async () => {
        if (inputValue.trim()) {
            try {
                await axios.post('http://localhost:3001/add', { task: inputValue });
                setTodos([...Todos, inputValue]);
                setInputValue('');
            } catch (err) {
                console.error('Error adding todo:', err);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Welcome to the Todo List App</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        aria-label="New todo input"
                    />
                    <button 
                        className="add-btn" 
                        onClick={handleAdd}
                        aria-label="Add todo"
                    >
                        Add
                    </button>
                </div>
                <div className="todos-container">
                    {Todos.length === 0 ? (
                        <p className="empty-message">No Todos</p>
                    ) : (
                        Todos.map((todo, index) => (
                            <div className="todo" key={index}>
                                <div className="todo-content">
                                    <input 
                                        type="checkbox" 
                                        aria-label={`Mark ${todo} as complete`}
                                    />
                                    <span className="todo-text">{todo}</span>
                                </div>
                                <button 
                                    className="delete-btn"
                                    aria-label={`Delete ${todo}`}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;