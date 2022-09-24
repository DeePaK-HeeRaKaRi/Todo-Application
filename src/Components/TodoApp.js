import React,{ useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import EditTodoForm from './EditTodoForm';
import AlertMessage from './AlertMessage';
import { Routes,Route } from 'react-router-dom';
import TodoHeader from './TodoHeader';
function TodoApp() {
  const initialState = {
    isAlert : false,
    message : ''
  };
  const [showAlert,setAlert] = useState(initialState);
  const initialValues = {
    title : '',
    description : '',
    id : ''
  };
  const [edit,setEdit] = useState(initialValues);
  return (
    <div>
      <TodoHeader /> 
      <AlertMessage setAlert={setAlert} showAlert={showAlert}/>
      <Routes>
        <Route path='' element={<TodoForm setAlert={setAlert} />}/>
        <Route path='todo-list' element={<TodoList editTodo = {setEdit} setAlert={setAlert}/>}/>
        <Route path='todo-list/edit-todo' element={<EditTodoForm editTodo={edit} setAlert={setAlert}/>}/>
      </Routes>
    </div>
  );
}

export default TodoApp;
