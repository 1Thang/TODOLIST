// src/reducers/todosReducer.js
const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  
  const todosReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_TODOS_SUCCESS':
        return { ...state, loading: false, todos: action.payload };
      case 'FETCH_TODOS_FAILURE':
        return { ...state, loading: false, error: 'Failed to fetch todos' };
      case 'ADD_TODO':
        return { ...state, todos: [...state.todos, action.payload] };
      case 'UPDATE_TODO':
        return {
          ...state,
          todos: state.todos.map((t) =>
            t.id === action.payload.id ? action.payload : t
          ),
        };
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter((t) => t.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default todosReducer;
  