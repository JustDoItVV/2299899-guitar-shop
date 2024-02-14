import { MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';

import { redirectToRoute } from '@guitar-shop/storage';
import { AppRoute } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';
import { useAppDispatch } from '../../hooks';

export default function NotFoundPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleContinueButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(redirectToRoute(AppRoute.Catalog));
  };

  return (
    <div>
      <Helmet>
        <title>404 — Guitar-shop</title>
      </Helmet>
      <SvgIcons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <section className="error">
              <h1 className="error__title">404</h1>
              <span className="error__subtitle">Страница не найдена.</span>
              <p className="error__text">
                {' '}
                Возможно, страница была удалена или
                <br />
                её вовсе не существовало.
              </p>
              <button
                className="button button__error button--small button--black-border"
                onClick={handleContinueButtonClick}
              >
                Продолжить покупки
              </button>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
