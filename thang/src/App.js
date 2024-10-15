// App.js
import React from 'react';
import { ThemeProvider } from './Component/ThemeContext';
import TodoList from '../src/Component/ListTodo';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TodoList />
    </ThemeProvider>
  );
}

export default App;
