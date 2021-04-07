import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { getCookie } from '../../utils/common.utils';
import ROUTES from '../../constants/routes.constants';

const PrivateRoute: FC<RouteProps> = (props) => {
  if (!getCookie('jwtToken')) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
