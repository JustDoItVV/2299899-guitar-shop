import 'react-tabs/style/react-tabs.css';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { DATE_FORMAT } from '@guitar-shop/consts';
import {
  fetchGuitarAction,
  selectGuitar,
  selectIsLoading,
} from '@guitar-shop/storage';
import { AppRoute } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';
import LoadingPage from '../../components/loading/loading.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFoundPage from '../not-found-page/not-found.page';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default function GuitarPage(): JSX.Element {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();

  const guitar = useAppSelector(selectGuitar);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchGuitarAction(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!guitar) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <Helmet>
        <title>Товар — Guitar-shop: {guitar.title}</title>
      </Helmet>
      <SvgIcons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Товар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
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
              <li className="breadcrumbs__item">
                <Link className="link" to={`.${AppRoute.Catalog}/${id}`}>
                  {guitar.title}
                </Link>
              </li>
            </ul>
            <div className="product-container">
              <img
                className="product-container__img"
                src={guitar.photoUrl}
                srcSet={`${guitar.photoUrl} 2x`}
                width={90}
                height={235}
                alt=""
              />
              <div className="product-container__info-wrapper">
                <Tabs
                  id="characteristics"
                  className="tabs"
                  disabledTabClassName="button--black-border"
                  direction="ltr"
                >
                  <TabPanel className="tabs__content">
                    <table className="tabs__table">
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Артикул:</td>
                          <td className="tabs__value">{guitar.vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Тип:</td>
                          <td className="tabs__value">{guitar.type}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Количество струн:</td>
                          <td className="tabs__value">
                            {guitar.guitarStrings} струнная
                          </td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Цена:</td>
                          <td className="tabs__value">{guitar.price} ₽</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Дата публикации:</td>
                          <td className="tabs__value">
                            {dayjs(guitar.publishDate).format(DATE_FORMAT)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </TabPanel>
                  <TabPanel className="tabs__content">
                    <p className="tabs__product-description">
                      {guitar.description}
                    </p>
                  </TabPanel>
                  <br />
                  <br />
                  <h2 className="product-container__title title title--big title--uppercase">
                    {guitar.title}
                  </h2>
                  <br />
                  <br />
                  <TabList style={{ margin: 0, padding: 0 }}>
                    <Tab
                      className="button button--medium tabs__button"
                      href="#characteristics"
                      style={{ display: 'inline-block' }}
                    >
                      Характеристики
                    </Tab>
                    <Tab
                      className="button button--medium tabs__button"
                      href="#description"
                      style={{ display: 'inline-block' }}
                    >
                      Описание
                    </Tab>
                  </TabList>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
