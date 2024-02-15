import { MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { redirectToRoute } from '@guitar-shop/storage';
import { AppRoute } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import GuitarsList from '../../components/guitars-list/guitars-list.component';
import Header from '../../components/header/header.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';
import { useAppDispatch } from '../../hooks';

export default function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleAddButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(redirectToRoute(AppRoute.Add));
  };

  return (
    <div>
      <Helmet>
        <title>Просмотр товаров — Guitar-shop</title>
      </Helmet>
      <SvgIcons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <section className="product-list">
            <div className="container">
              <h1 className="product-list__title">Список товаров</h1>
              <ul className="breadcrumbs">
                <li className="breadcrumbs__item">
                  <Link className="link" to={AppRoute.Login}>
                    Вход
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="link" to={AppRoute.Catalog}>
                    Товары
                  </Link>
                </li>
              </ul>
              <GuitarsList />
              <button
                className="button product-list__button button--red button--big"
                onClick={handleAddButtonClick}
              >
                Добавить новый товар
              </button>
              <div className="pagination product-list__pagination">
                <ul className="pagination__list">
                  <li className="pagination__page pagination__page--active">
                    <Link
                      className="link pagination__page-link"
                      to={`${AppRoute.Catalog}?page=1`}
                    >
                      1
                    </Link>
                  </li>
                  <li className="pagination__page">
                    <Link
                      className="link pagination__page-link"
                      to={`${AppRoute.Catalog}?page=2`}
                    >
                      2
                    </Link>
                  </li>
                  <li className="pagination__page">
                    <Link
                      className="link pagination__page-link"
                      to={`${AppRoute.Catalog}?page=3`}
                    >
                      3
                    </Link>
                  </li>
                  <li
                    className="pagination__page pagination__page--next"
                    id="next"
                  >
                    <Link
                      className="link pagination__page-link"
                      to={`${AppRoute.Catalog}?page=2`}
                    >
                      Далее
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
