// Component/useTodos.js
import { useState, useRef, useEffect } from 'react';

const useTodos = (initialTodos = []) => {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState(5);
  const listRef = useRef();

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodoText = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const deleteAll = () => setTodos([]);

  const filteredTodos = () => {
    if (filter === 'completed') return todos.filter((todo) => todo.completed);
    if (filter === 'active') return todos.filter((todo) => !todo.completed);
    return todos;
  };

  const loadMoreTodos = () => setVisibleTodos((prev) => prev + 5);

  const handleScroll = () => {
    const list = listRef.current;
    if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
      loadMoreTodos();
    }
  };

  useEffect(() => {
    const list = listRef.current;
    list.addEventListener('scroll', handleScroll);
    return () => list.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    todos,
    visibleTodos,
    filteredTodos,
    addTodo,
    toggleTodo,
    updateTodoText,
    deleteTodo,
    deleteAll,
    setFilter,
    listRef,
  };
};

export default useTodos;
