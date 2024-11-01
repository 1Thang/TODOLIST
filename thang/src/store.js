// src/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todosReducer from './reducers/todosReducer';
import themeReducer from './reducers/themeReducer';

// Combine reducers
const rootReducer = combineReducers({
  todos: todosReducer,
  theme: themeReducer,
});

// Create Redux store with middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
