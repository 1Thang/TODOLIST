import { useState, useEffect } from 'react';
import api from '../Api/Api';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); 

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/Products');
      setTodos(response.data);
      setMessage('Fetched todos successfully!');
    } catch {
      setError('Failed to fetch todos');
      setMessage('Failed to fetch todos!');
    } finally {
      setLoading(false);
    }
  };

  const addOrEditTodo = async (todo) => {
    try {
      if (todo.id) {
        await api.put(`/Products/${todo.id}`, todo);
        setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
        setMessage('Todo updated successfully!');
      } else {
        const response = await api.post('/Products', todo);
        setTodos((prev) => [...prev, response.data]);
        setMessage('Todo added successfully!');
      }
      setEditingTodo(null);
    } catch {
      setError('Failed to save todo');
      setMessage('Failed to save todo!');
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await api.put(`/Products/${todo.id}`, updatedTodo);
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
      setMessage('Todo status updated!');
    } catch {
      setError('Failed to update todo status');
      setMessage('Failed to update todo status!');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/Products/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setMessage('Todo deleted successfully!');
    } catch {
      setError('Failed to delete todo');
      setMessage('Failed to delete todo!');
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
    message, 
  };
};

export default useTodos;
