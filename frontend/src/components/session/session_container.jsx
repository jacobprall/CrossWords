import React from 'react'
import {withRouter} from 'react-router-dom'
import Session from './session'
import { useSelector, useDispatch } from 'react-redux'
import { login, signup } from '../../actions/session_actions'




function SessionContainer(props) {

  const formType = props.match.path
  const errors = useSelector(state => Object.values(state.errors.session));
  const isSignedIn = useSelector(state => state.session.isSignedIn)
  const dispatch = useDispatch();
  const loginDispatch = (user) => dispatch(login(user));
  const signupDispatch = (user) => dispatch(signup(user));
  
  const processForm = (user) => {
    if (formType === "/login") {
      loginDispatch(user);
    } else {
      signupDispatch(user);
    }
  };

  const processDemoForm = (user) => {
    loginDispatch(user);
  }

  
  const sessionProps = {
    formType,
    errors,
    isSignedIn,
    processForm,
    processDemoForm

  }

  return (
    <>
      <Session props={sessionProps}/>
    </>
  )
}

export default withRouter(SessionContainer)
