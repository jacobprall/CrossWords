import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Session from './session';
import { useSelector, useDispatch } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import { Modal } from '../modal/modal';
import regeneratorRuntime from "regenerator-runtime";

function SessionContainer(props) {
  const [user, setUser] = useState(null); 
  const [demoLogin, setDemoLogin] = useState(null); 
  const formType = props.match.path;
  const errors = useSelector((state) => Object.values(state.errors.session));
  const dispatch = useDispatch();
  const loginDispatch = (user) => dispatch(login(user));
  const signupDispatch = (user) => dispatch(signup(user));
  
  useEffect(() => {
    let isSubscribed = true; 
    if (user) processForm(user);
    return () => isSubscribed = false; 
  }, [user]);

  useEffect(() => {
      let isSubscribed = true; 
      if (demoLogin) processDemoForm(demoLogin); 
      return () => isSubscribed = false; 
  }, [demoLogin]);

  const processForm = async (user) => {
    if (formType === '/login') {
      await loginDispatch(user);
    } else {
      await signupDispatch(user);
    }
    if (user) props.history.replace("/");
  };

  const processDemoForm = async (user) => {
    await loginDispatch(user);
    if (demoLogin) props.history.replace("/");
  };

  const sessionProps = {
    formType,
    errors,
    setUser,
    setDemoLogin,
  };

  
  if (props.isShowing) {
    return (
      <Modal 
        isShowing={props.isShowing} 
        Comp={Session} 
        sessionProps={sessionProps}/>
    )  
    } else {
      return <div></div>
    }
}

export default withRouter(SessionContainer);
