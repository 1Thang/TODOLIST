import React, { useContext, useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { ThemeContext } from './ThemeContext';
import useTodos from './useTodos';
import useThemeStyles from './useThemeStyles';

const TodoList = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const {
    todos,
    addOrEditTodo,
    toggleCompleted,
    startEditing,
    editingTodo,
    deleteTodo,
    loading,
    error,
    message, 
  } = useTodos();

  const styles = useThemeStyles();
  const [visibleMessage, setVisibleMessage] = useState(''); 

  useEffect(() => {
    if (message) {
      setVisibleMessage(message);
      const timer = setTimeout(() => setVisibleMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1>To-Do List</h1>
      <button onClick={toggleTheme}>
        Switch to {styles.container.color === 'black' ? 'Light' : 'Dark'} Mode
      </button>

      {visibleMessage && (
        <div style={styles.message}>
          <p>{visibleMessage}</p>
        </div>
      )}

      <TodoForm addOrEditTodo={addOrEditTodo} editingTodo={editingTodo} />

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleCompleted={toggleCompleted}
            startEditing={startEditing}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
