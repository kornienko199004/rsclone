import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest } : { component: React.FC, path: '/app' }) => {
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
  console.log(`${isLoggedIn}dsadasww`);
  return (
    <Route
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props: any) => (
        isLoggedIn
          // eslint-disable-next-line react/jsx-props-no-spreading
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )}
    />
  );
};

export default PrivateRoute;
