import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postTodo } from '../Redux/Features/TodoSlice';
import './TodoForm.css';

function TodoForm(props) {
  const initialState = {
    title : '',
    description : '',
    id : ''
  };
  const [todo,setTodo] = useState(initialState);
  const [isForm, setisform] = useState(false);
  const { loading,error,isAlert,alertMessage } = useSelector((state) => ({ ...state.todo }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if(!loading) {
      if(isForm && error === null) {
        props.setAlert({ isAlert : isAlert,message : alertMessage });
        setisform(false);
        navigate('todo-list');
      }else{
        if(error !== null) {
          alert(error);
        }
      }
    }else{
      console.log('Form is Submitted');
    }
  },[loading]);

  const SubmitForm = () => {
    if(todo.title === '' || todo.description === '') {
      window.alert('All Fields are mandatory');
    }
    else{
      todo.id = Math.floor(10000 + Math.random() * 90000);
      dispatch(postTodo(todo));
      setisform(true);
      setTodo(initialState);
    }
  };

  return (
    <div className='form'>
      <form>
        <div className='field'>
          <label className='label'>Title:</label>
          <input type='text'
            name='title'
            onChange={(e) => {setTodo({ ...todo,title : e.target.value });}}
            value= {todo.title}/>
        </div>

                
        <div className='field'>
          <label className='label'>Title:</label>
          <textarea type='text'
            rows='6'
            cols='23'
            name='description'
            onChange={(e) => {setTodo({ ...todo,description : e.target.value });}}
            value= {todo.description}>
          </textarea>
        </div>
        <div className='field'>
          <button className='submitBtn' type='button' onClick={SubmitForm}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;