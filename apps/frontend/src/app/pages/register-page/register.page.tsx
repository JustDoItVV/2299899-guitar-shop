import { FormEvent, useEffect, useRef } from 'react';

import {
  redirectToRoute,
  registerAction,
  selectAuthStatus,
} from '@guitar-shop/storage';
import { AppRoute, AuthStatus } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingPage from '../loading-page/loading-page';

export default function RegisterPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthStatus);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

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
    if (
      nameRef.current !== null &&
      emailRef.current !== null &&
      passwordRef.current !== null
    ) {
      dispatch(
        registerAction({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  return (
    <div>
      <SvgIcons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <section className="login">
              <h1 className="login__title">Регистрация</h1>
              <form method="post" action="/" onSubmit={handleFormSubmit}>
                <div className="input-login">
                  <label htmlFor="name">Введите имя</label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="off"
                    required
                  />
                  <p className="input-login__error">Заполните поле</p>
                </div>
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
                  <label htmlFor="password">Придумайте пароль</label>
                  <span>
                    <input
                      ref={passwordRef}
                      type="password"
                      placeholder="• • • • • • • • • • • •"
                      id="password"
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
                  Зарегистрироваться
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
