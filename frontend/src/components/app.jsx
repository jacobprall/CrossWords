import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import Navbar from "./nav/navbar";
import MainPage from "./main/main_page";
import SessionContainer from './session/session_container'; 
import useStick from './custom_hooks/useStick'; 

const App = () => {
  const { stick, ele } = useStick();

  return (
    <div>
      <Navbar stick={stick} ele={ele} />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={SessionContainer} />
        <AuthRoute exact path="/signup" component={SessionContainer} />
      </Switch>
    </div>
  )
};

export default App;
