import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateTodo } from '../Redux/Features/TodoSlice';
import './TodoForm.css';

function EditTodoForm(props) {
  const initialState = {
    title : props.editTodo.title,
    description : props.editTodo.description,
    id : props.editTodo.id
  };
  const [todo,setTodo] = useState(initialState);
  const [isEdited, setIsEdited] = useState(false);
  const { loading,error,isAlert,alertMessage } = useSelector((state) => ({ ...state.todo }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if(!loading) {
      if(isEdited && error === null) {
        props.setAlert({ isAlert : isAlert,message : alertMessage });
        setIsEdited(false);
        navigate(-1);
      }else{
        if(error !== null) {
          alert(error);
        }
      }
    }else{
      console.log('UpdatedForm is Submitted');
    }
  },[loading]);

  const editForm = () => {
    if(todo.title === '' || todo.description === '') {
      window.alert('All Fields are mandatory');
    }
    else{
           
      dispatch(updateTodo(todo));
      setIsEdited(true);
    
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
          <button className='submitBtn' type='button' onClick={editForm}>Submit</button>
        </div>
      </form>
    </div>
  );
}
export default EditTodoForm;