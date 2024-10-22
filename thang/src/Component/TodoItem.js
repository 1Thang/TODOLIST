import React from 'react';

const TodoItem = ({ todo, toggleCompleted, startEditing, deleteTodo }) => {
  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTodo(todo.id);
    }
  };

  return (
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompleted(todo)}
        style={{ marginRight: '8px' }}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          marginRight: '8px',
          flexGrow: 1,
        }}
      >
        {todo.name}
      </span>
      <button onClick={() => startEditing(todo)} style={{ marginRight: '4px' }}>
        Edit
      </button>
      <button onClick={confirmDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
