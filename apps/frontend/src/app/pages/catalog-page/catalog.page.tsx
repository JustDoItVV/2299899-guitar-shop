import { MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { redirectToRoute, setPage } from '@guitar-shop/storage';
import { AppRoute } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import GuitarsList from '../../components/guitars-list/guitars-list.component';
import Header from '../../components/header/header.component';
import PaginationControls from '../../components/pagination-controls/pagination-controls.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';
import { useAppDispatch } from '../../hooks';

export default function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(setPage(1));

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
              <PaginationControls />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
