// src/actions/todoActions.js
import api from '../Api/Api';

// Action creators
export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: 'FETCH_TODOS_REQUEST' });
  try {
    const response = await api.get('/Products');
    dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: response.data });
  } catch {
    dispatch({ type: 'FETCH_TODOS_FAILURE' });
  }
};

export const addTodo = (todo) => async (dispatch) => {
  const response = await api.post('/Products', todo);
  dispatch({ type: 'ADD_TODO', payload: response.data });
};

export const updateTodo = (todo) => async (dispatch) => {
  await api.put(`/Products/${todo.id}`, todo);
  dispatch({ type: 'UPDATE_TODO', payload: todo });
};

export const deleteTodo = (id) => async (dispatch) => {
  await api.delete(`/Products/${id}`);
  dispatch({ type: 'DELETE_TODO', payload: id });
};
