import React,{ useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Todo from './Todo';
import { Link } from 'react-router-dom';
import { getTodo } from '../Redux/Features/TodoSlice';
import './TodoList.css';
function TodoList(props) {
  const { todos,alertMessage } = useSelector((state) => ({ ...state.todo }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodo());
  },[alertMessage]);
  return (
    <div>
      <div className='list-header'>
        <h2>LIST OF TODOS</h2>
        <Link className='addBtn' to='/'>Add Item</Link>
      </div>
      <ul className='todoContainer'>
        <div className='todo-header'>
          <span>Title</span>
          <span>Description</span>
          <span>Action</span>
        </div>
         
        { 
         
          todos.map((todo) =>
          
            <Todo key={todo.id} title={todo.title} description={todo.description} 
              id={todo.id} editTodo={props.editTodo} deleteAlert={props.setAlert} />
          )
        }
      </ul>
    </div>
  );
}

export default TodoList;
