import React, { useEffect } from 'react';
import './AlertMessage.css';
function AlertMessage(props) {
  const closeAlert = () => {
    props.setAlert({ isAlert : false ,message : '' });
  };
  const TIMER_INTERVAL = 2000;
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setAlert({ isAlert : false ,message : '' });
    },TIMER_INTERVAL);
    return () => clearTimeout(timer);
  },[props.showAlert.isAlert]);
  return (
    <>
      {
        props.showAlert.isAlert ? 
          <div className='show-alert'>
            <p className='remove-alert' onClick={closeAlert}>x</p>
            <p>{props.showAlert.message}</p>
          </div> : null
      }
    </>
  );
}

export default AlertMessage;
