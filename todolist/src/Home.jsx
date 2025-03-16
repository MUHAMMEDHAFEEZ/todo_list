import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

function Home() {
    const [Todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [checkedTodos, setCheckedTodos] = useState({});

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get('http://localhost:3001/');
            console.log('Fetched todos:', res.data); // Debug log
            setTodos(res.data);
        } catch (err) {
            console.error('Error fetching todos:', err);
        }
    };

    const handleAdd = async () => {
        if (inputValue.trim()) {
            try {
                const response = await axios.post('http://localhost:3001/add', { task: inputValue });
                console.log('Added todo:', response.data); // Debug log
                setTodos(prevTodos => [...prevTodos, response.data]);
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

    const handleCheck = (id) => {
        setCheckedTodos(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/delete/${id}`);
            if (response.status === 200) {
                // Remove from UI only if successfully deleted from database
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            }
        } catch (err) {
            console.error('Error deleting todo:', err);
            alert('Failed to delete todo');
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
                        Todos.map((todo) => (
                            <div className="todo" key={todo._id}>
                                <div className="todo-content">
                                    <input 
                                        type="checkbox" 
                                        checked={checkedTodos[todo._id] || false}
                                        onChange={() => handleCheck(todo._id)}
                                        aria-label={`Mark ${todo.task} as complete`}
                                    />
                                    <span 
                                        className="todo-text"
                                        style={{
                                            textDecoration: checkedTodos[todo._id] ? 'line-through' : 'none',
                                            color: checkedTodos[todo._id] ? '#666' : 'inherit'
                                        }}
                                    >
                                        {todo.task}
                                    </span>
                                </div>
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDelete(todo._id)}
                                    aria-label={`Delete ${todo.task}`}
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