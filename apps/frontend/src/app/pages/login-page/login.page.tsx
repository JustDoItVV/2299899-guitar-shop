import { FormEvent, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import {
  loginAction,
  redirectToRoute,
  selectAuthStatus,
} from '@guitar-shop/storage';
import { AppRoute, AuthStatus } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingPage from '../loading-page/loading-page';

export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Catalog));
    }
  }, [dispatch, authStatus]);

  if (authStatus === AuthStatus.Auth) {
    return <LoadingPage />;
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(
        loginAction({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>Авторизация — Guitar-shop</title>
      </Helmet>
      <SvgIcons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <section className="login">
              <h1 className="login__title">Войти</h1>
              <p className="login__text">
                Hовый пользователь?{' '}
                <Link className="login__link" to={AppRoute.Register}>
                  Зарегистрируйтесь
                </Link>{' '}
                прямо сейчас
              </p>
              <form method="post" action="/" onSubmit={handleFormSubmit}>
                <div className="input-login">
                  <label htmlFor="email">Введите e-mail</label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    required
                  />
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <div className="input-login">
                  <label htmlFor="passwordLogin">Введите пароль</label>
                  <span>
                    <input
                      ref={passwordRef}
                      type="password"
                      placeholder="• • • • • • • • • • • •"
                      id="passwordLogin"
                      name="password"
                      autoComplete="off"
                      required
                    />
                    <button className="input-login__button-eye" type="button">
                      <svg width={14} height={8} aria-hidden="true">
                        <use xlinkHref="#icon-eye" />
                      </svg>
                    </button>
                  </span>
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <button
                  className="button login__button button--medium"
                  type="submit"
                >
                  Войти
                </button>
              </form>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
