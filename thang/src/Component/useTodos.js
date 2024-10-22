import { useState, useEffect } from 'react';
import api from '../Api/Api';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/Products');
      setTodos(response.data);
    } catch {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addOrEditTodo = async (todo) => {
    try {
      if (todo.id) {
        await api.put(`/Products/${todo.id}`, todo);
        setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
      } else {
        const response = await api.post('/Products', todo);
        setTodos((prev) => [...prev, response.data]);
      }
      setEditingTodo(null);
    } catch {
      setError('Failed to save todo');
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await api.put(`/Products/${todo.id}`, updatedTodo);
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
    } catch {
      setError('Failed to update todo status');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/Products/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('Failed to delete todo');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    addOrEditTodo,
    toggleCompleted,
    startEditing: setEditingTodo,
    editingTodo,
    deleteTodo,
    loading,
    error,
  };
};

export default useTodos;
