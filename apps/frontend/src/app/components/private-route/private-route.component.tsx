import { Navigate } from 'react-router-dom';

import { AppRoute, AuthStatus } from '@guitar-shop/types';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
};

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authStatus, children } = props;

  return authStatus === AuthStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
