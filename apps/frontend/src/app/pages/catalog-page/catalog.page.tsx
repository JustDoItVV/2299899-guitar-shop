import { MouseEvent, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import {
  fetchGuitarsAction,
  redirectToRoute,
  selectGuitars,
  selectIsLoading,
} from '@guitar-shop/storage';
import { AppRoute } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import GuitarsList from '../../components/guitars-list/guitars-list.component';
import Header from '../../components/header/header.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingPage from '../loading-page/loading-page';

export default function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const guitars = useAppSelector(selectGuitars);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchGuitarsAction());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingPage />;
  }

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
              <div className="catalog">
                <form className="catalog-filter" action="#" method="post">
                  <h2 className="title title--bigger catalog-filter__title">
                    Фильтр
                  </h2>
                  <fieldset className="catalog-filter__block">
                    <legend className="catalog-filter__block-title">
                      Тип гитар
                    </legend>
                    <div className="form-checkbox catalog-filter__block-item">
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        id="acoustic"
                        name="acoustic"
                      />
                      <label htmlFor="acoustic">Акустические гитары</label>
                    </div>
                    <div className="form-checkbox catalog-filter__block-item">
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        id="electric"
                        name="electric"
                        defaultChecked
                      />
                      <label htmlFor="electric">Электрогитары</label>
                    </div>
                    <div className="form-checkbox catalog-filter__block-item">
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        id="ukulele"
                        name="ukulele"
                        defaultChecked
                      />
                      <label htmlFor="ukulele">Укулеле</label>
                    </div>
                  </fieldset>
                  <fieldset className="catalog-filter__block">
                    <legend className="catalog-filter__block-title">
                      Количество струн
                    </legend>
                    <div className="form-checkbox catalog-filter__block-item">
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        id="4-strings"
                        name="4-strings"
                        defaultChecked
                      />
                      <label htmlFor="4-strings">4</label>
                    </div>
                    <div className="form-checkbox catalog-filter__block-item">
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        id="6-strings"
                        name="6-strings"
                        defaultChecked
                      />
                      <label htmlFor="6-strings">6</label>
                    </div>
                    <div className="form-checkbox catalog-filter__block-item">
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        id="7-strings"
                        name="7-strings"
                      />
                      <label htmlFor="7-strings">7</label>
                    </div>
                    <div className="form-checkbox catalog-filter__block-item">
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        id="12-strings"
                        name="12-strings"
                        disabled
                      />
                      <label htmlFor="12-strings">12</label>
                    </div>
                  </fieldset>
                  <button
                    className="catalog-filter__reset-btn button button--black-border button--medium"
                    type="reset"
                  >
                    Очистить
                  </button>
                </form>
                <div className="catalog-sort">
                  <h2 className="catalog-sort__title">Сортировать:</h2>
                  <div className="catalog-sort__type">
                    <button
                      className="catalog-sort__type-button catalog-sort__type-button--active"
                      aria-label="по цене"
                    >
                      по дате
                    </button>
                    <button
                      className="catalog-sort__type-button"
                      aria-label="по цене"
                    >
                      по цене
                    </button>
                  </div>
                  <div className="catalog-sort__order">
                    <button
                      className="catalog-sort__order-button catalog-sort__order-button--up"
                      aria-label="По возрастанию"
                    />
                    <button
                      className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active"
                      aria-label="По убыванию"
                    />
                  </div>
                </div>
                <div className="catalog-cards">
                  <GuitarsList pagination={guitars} />
                </div>
              </div>
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
