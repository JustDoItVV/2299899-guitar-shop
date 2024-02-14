import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

import { AppRoute, AuthStatus } from '@guitar-shop/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import PrivateRoute from './components/private-route/private-route.component';
import AddPage from './pages/add-page/add.page';
import CatalogPage from './pages/catalog-page/catalog.page';
import EditPage from './pages/edit-page/edit.page';
import GuitarPage from './pages/guitar-page/guitar.page';
import LoginPage from './pages/login-page/login.page';
import NotFoundPage from './pages/not-found-page/not-found.page';
import RegisterPage from './pages/register-page/register.page';

export function App() {
  const authStatus = AuthStatus.Auth;

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route
          path={AppRoute.Catalog}
          element={
            <PrivateRoute authStatus={authStatus} children={<CatalogPage />} />
          }
        />
        <Route
          path={`${AppRoute.Catalog}${AppRoute.Add}`}
          element={
            <PrivateRoute authStatus={authStatus} children={<AddPage />} />
          }
        />
        <Route
          path={`${AppRoute.Catalog}/:id`}
          element={
            <PrivateRoute authStatus={authStatus} children={<GuitarPage />} />
          }
        />
        <Route
          path={`${AppRoute.Catalog}/:id${AppRoute.Edit}`}
          element={
            <PrivateRoute authStatus={authStatus} children={<EditPage />} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
