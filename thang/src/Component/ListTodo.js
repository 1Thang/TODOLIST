import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { ThemeContext } from './ThemeContext';
import useTodos from './useTodos';
import useThemeStyles from './useThemeStyles'; // Import the custom hook

const TodoList = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const {
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
  } = useTodos();

  const styles = useThemeStyles(); // Use the custom hook

  return (
    <div style={styles.container}>
      <h1>To-Do List</h1>
      <button onClick={toggleTheme}>
        Switch to {styles.container.color === 'black' ? 'Light' : 'Dark'} Mode
      </button>
      <TodoForm addTodo={addTodo} />
      <div ref={listRef} style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <ul>
          {filteredTodos().slice(0, visibleTodos).map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              updateTodoText={updateTodoText}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {visibleTodos < filteredTodos().length && <div>Loading more items...</div>}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={deleteAll}>Delete All</button>
        <button onClick={() => setFilter('all')}>Show All</button>
        <button onClick={() => setFilter('completed')}>Show Completed</button>
        <button onClick={() => setFilter('active')}>Show Active</button>
      </div>
    </div>
  );
};

export default TodoList;
