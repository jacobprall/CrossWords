import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact, isShowing }) => {
  return <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component isShowing={isShowing} {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )} />
}

const Protected = ({ component: Component, loggedIn, ...rest }) => {
  console.log("HERE------------------------");
  return <Route 
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signup" />
      )
    }
  />
};

const mapStateToProps = state => (
  { loggedIn: state.session.isAuthenticated }
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
