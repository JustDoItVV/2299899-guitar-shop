import { Navigate } from 'react-router-dom';

import { AppRoute } from '@guitar-shop/types';

export default function MainPage(): JSX.Element {
  return <Navigate to={AppRoute.Catalog} />;
}
