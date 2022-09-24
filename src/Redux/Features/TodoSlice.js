import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../Api/todoApi';

const initialState = {
  todos : [],
  loading : false,
  error : null,
  isAlert : false,
  alertMessage : null
};

export const getTodo = createAsyncThunk('todo/getTodo',async() => {
  return await api.get('/todos').then((response) => response.data);
});

export const postTodo = createAsyncThunk('todo/postTodo',async(postData) => {
  // console.log(postData);
  return await api.post('/todos',postData).then((response) => response.data);
});

export const removeTodo = createAsyncThunk('todo/deleteTodo',async({ id }) => {
  return await api.delete(`/todos/${id}`).then((response) => response.data);
});

export const updateTodo = createAsyncThunk('todo/updateTodo',async(data) => {
  return await api.put(`/todos/${data.id}`,data).then((response) => response.data);
});

const reducer = createSlice({
  name : 'todos',
  initialState,
  extraReducers : {
    [getTodo.pending] : (state) => {
      state.loading = true;
    },
    [getTodo.fulfilled] : (state,action) => {
      state.loading = false;
      state.todos = action.payload;
      state.isAlert = false;
      state.alertMessage = null;
    },
    [getTodo.rejected] : (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [updateTodo.pending] : (state) => {
      state.loading = true;
    },
    [updateTodo.fulfilled] : (state) => {
      state.loading = false;
      state.todos = [...state.todos];
      state.isAlert = true;
      state.alertMessage = 'Updated successfully!' ;
      state.error = null;
    },
    [updateTodo.rejected] : (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [removeTodo.pending] : (state) => {
      state.loading = true;
    },
    [removeTodo.fulfilled] : (state) => {
      state.loading = false;
      state.todos = [...state.todos];
      state.isAlert = true;
      state.alertMessage = 'Deleted Successfully !!';
      state.error = null;
    },
    [removeTodo.rejected] : (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [postTodo.pending] : (state) => {
      state.loading = true;
    },
    [postTodo.fulfilled] : (state,action) => {
      state.loading = false;
      state.todos = [...state.todos, action.payload];
      state.isAlert = true;
      state.alertMessage = 'Added Successfully!';
      state.error = null;
    },
    [postTodo.rejected] : (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    }
  }
});

export const todoReducer = reducer.reducer;