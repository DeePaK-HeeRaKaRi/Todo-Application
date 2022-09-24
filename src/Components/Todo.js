import React,{ useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { removeTodo } from '../Redux/Features/TodoSlice';
import { useNavigate } from 'react-router-dom';
import './Todo.css';

function Todo({ title,description,id,editTodo,deleteAlert }) {
  const { loading,error,isAlert,alertMessage } =  useSelector((state) => ({ ...state.todo }));
  const [isDelete,setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const editValues = {
    title : title,
    description : description,
    id : id
  };
  const navigate = useNavigate();
  const EditTodo = () => {
    navigate('edit-todo');
    editTodo(editValues);
  };
  const deleteTodo = () => {
    dispatch(removeTodo({ id }));
    setIsDelete(true);
  };
  useEffect(() => {
    if(!loading) {
      if(isDelete && error === null) {
        deleteAlert({ isAlert : isAlert,message : alertMessage });
        setIsDelete(false);
      }else{
        if(error != null) {
          alert(error);
        }
      }
    }
  },[alertMessage]);
  return (
    <div>
      <li className='todoList-container'>
        <span className='title'>
          {title}
        </span>
        <span className='description'>
          {description}
        </span>
        <span className='button'>
          <button className='btn' onClick={deleteTodo}>Delete</button>
          <button className='btn' onClick={EditTodo()}>Edit</button>
        </span>
      </li>
    </div>
  );
}

export default Todo;
