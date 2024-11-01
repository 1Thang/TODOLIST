// src/Component/ListTodo.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../actions/todoActions';
import { toggleTheme } from '../actions/themeActions';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddOrEditTodo = (todo) => {
    if (todo.id) {
      dispatch(updateTodo(todo));
    } else {
      dispatch(addTodo(todo));
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1>To-Do List</h1>
      <button onClick={() => dispatch(toggleTheme())}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <TodoForm addOrEditTodo={handleAddOrEditTodo} />

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
