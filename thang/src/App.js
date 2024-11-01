// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './Component/ListTodo';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
