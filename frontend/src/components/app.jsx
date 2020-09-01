import React, { useEffect } from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import Navbar from "./nav/navbar";
import MainPage from "./main/main_page";
import SessionContainer from './session/session_container'; 
import useStick from './custom_hooks/useStick'; 
import { useModal } from './custom_hooks/useModal';

const App = (props) => {
  const { stick, ele } = useStick();
  const { isShowing, toggle } = useModal();
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  
  useEffect(() => {
    !loggedIn ? toggle(true) : toggle(false);
  }, [loggedIn])

  return (
    <div>
      <Navbar stick={stick} ele={ele} />
      <Switch>
        <ProtectedRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={SessionContainer} isShowing={isShowing}/>
        <AuthRoute exact path="/signup" component={SessionContainer} isShowing={isShowing}/>
      </Switch>
    </div>
  )
};

export default App;
