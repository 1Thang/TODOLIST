// src/Component/TodoForm.js
import React, { useState, useEffect } from 'react';

const TodoForm = ({ addOrEditTodo, editingTodo }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setName(editingTodo.name);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addOrEditTodo({ ...editingTodo, name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add or Edit a todo"
        style={{ marginRight: '8px' }}
      />
      <button type="submit">{editingTodo ? 'Save' : 'Add'}</button>
    </form>
  );
};

export default TodoForm;
  