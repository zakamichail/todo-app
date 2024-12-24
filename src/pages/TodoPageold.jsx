import React, { useState } from 'react';
import TodoList from './compotents/TodoList';
import './todo.css';



function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Поступить в мтуки', completed: true },
    { id: 2, title: 'Отчислиться', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') {
      return todo.completed;
    }
    if (filter === 'incomplete') {
      return !todo.completed;
    }
    return true;
  }); 

  return (
    <div className="app-container">
       <button
          style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
          }}
          onClick={() => nav('/dnd')}
      >
          Лееее таблицу дай да
      </button>
      <h1>Список задач</h1>
      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавить новую задачу..."
        />
        <button type="submit">Добавить</button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>Все задачи</button>
        <button onClick={() => setFilter('completed')}>Выполненные</button>
        <button onClick={() => setFilter('incomplete')}>Невыполненные</button>
      </div>

      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
