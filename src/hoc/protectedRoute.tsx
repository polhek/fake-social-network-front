import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  loggedIn: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { component: Component, loggedIn, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        loggedIn ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
