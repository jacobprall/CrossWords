import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact, isShowing }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !loggedIn ? (
          <Component isShowing={isShowing} {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

const Protected = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/signup" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
