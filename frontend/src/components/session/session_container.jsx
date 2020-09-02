import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Session from './session';
import { useSelector, useDispatch } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import { Modal } from '../modal/modal';
import regeneratorRuntime from "regenerator-runtime";

function SessionContainer(props) {
  const [user, setUser] = useState(null); 
  const [demoLogin, setDemoUser] = useState(null); 
  const formType = props.match.path;
  const errors = useSelector((state) => Object.values(state.errors.session));
  const dispatch = useDispatch();
  const loginDispatch = (user) => dispatch(login(user));
  const signupDispatch = (user) => dispatch(signup(user));
  
  const handleUser = (user) => {
    setUser(user); 
  }

  const handleDemoUser = (demoUser) => {
    setDemoUser(demoUser); 
  }

  useEffect(() => {
    let isSubscribed = true; 
    if (isSubscribed && user) processForm(user);
    return () => isSubscribed = false; 
  }, [user]);

  useEffect(() => {
    let isSubscribed = true; 
    if (isSubscribed && demoLogin) processDemoForm(demoLogin); 
    return () => isSubscribed = false; 
  }, [demoLogin]);

  const processForm = async () => {
    if (formType === '/login') {
      await loginDispatch(user);
    } else {
      await signupDispatch(user);
    } 
  };

  const processDemoForm = async () => {
    await loginDispatch(demoLogin);
  };

  const sessionProps = {
    formType,
    errors,
    handleUser,
    handleDemoUser,
  };

  
  if (props.isShowing) {
    return <Modal 
        isShowing={props.isShowing} 
        Comp={Session} 
        sessionProps={sessionProps}
      />
    } else {
      return <div></div>
    }
}

export default withRouter(SessionContainer);
