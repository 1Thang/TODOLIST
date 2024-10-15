import React, { useState } from 'react';
import useThemeStyles from './useThemeStyles';

const TodoItem = ({ todo, toggleTodo, updateTodoText, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const styles = useThemeStyles(); // Use the custom hook

  const handleToggle = () => toggleTodo(todo.id);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleChange = (e) => setEditText(e.target.value);

  const finishEditing = () => {
    if (editText.trim()) {
      updateTodoText(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') finishEditing();
  };

  return (
    <li style={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        style={{ marginRight: '10px' }}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={handleChange}
          onBlur={finishEditing}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ flex: 1 }}
        />
      ) : (
        <span style={{ flex: 1 }}>{todo.text}</span>
      )}
      {!isEditing && (
        <button onClick={handleEditClick} style={{ marginLeft: '10px' }}>
          Edit
        </button>
      )}
      <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
