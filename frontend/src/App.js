import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const API_BASE_URL = 'http://localhost:3001';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([
        { id: 1, text: 'サンプルタスク1' },
        { id: 2, text: 'サンプルタスク2' }
      ]);
    }
  };

  const addTodo = async () => {
    if (inputValue.trim() === '') return;

    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, {
        text: inputValue
      });
      setTodos([...todos, response.data]);
      setInputValue('');
    } catch (error) {
      console.error('Error adding todo:', error);
      const newTodo = {
        id: todos.length + 1,
        text: inputValue
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const sortTodos = (order) => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (order === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setTodos(sortedTodos);
    setSortOrder(order);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h1 className="title">Todoリスト</h1>
        
        <div className="input-section">
          <input
            type="text"
            className="task-input"
            placeholder="新しいタスクを入力してください"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="add-button" onClick={addTodo}>
            追加
          </button>
        </div>

        <div className="sort-section">
          <button 
            className="sort-button" 
            onClick={() => sortTodos('asc')}
            style={{ backgroundColor: sortOrder === 'asc' ? '#007bff' : '#6c757d' }}
          >
            昇順ソート
          </button>
          <button 
            className="sort-button" 
            onClick={() => sortTodos('desc')}
            style={{ backgroundColor: sortOrder === 'desc' ? '#007bff' : '#6c757d' }}
          >
            降順ソート
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span className="todo-number">No.{todo.id}</span>
              <span className="todo-text">{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
