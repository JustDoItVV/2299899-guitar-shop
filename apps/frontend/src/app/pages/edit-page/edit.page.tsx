import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { AppRoute } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';

export default function EditPage(): JSX.Element {
  return (
    <div>
      <Helmet>
        <title>Редактирование товара — Guitar-shop</title>
      </Helmet>
      <SvgIcons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <section className="edit-item">
            <div className="container">
              <h1 className="edit-item__title">СURT Z30 Plus</h1>
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
                <li className="breadcrumbs__item">
                  <Link className="link" to={`./:id`}>
                    СURT Z30 Plus
                  </Link>
                </li>
              </ul>
              <form className="edit-item__form" action="#" method="get">
                <div className="edit-item__form-left">
                  <div className="edit-item-image edit-item__form-image">
                    <div className="edit-item-image__image-wrap">
                      <img
                        className="edit-item-image__image"
                        src="img/content/add-item-1.png"
                        srcSet="img/content/add-item-1@2x.png 2x"
                        width={133}
                        height={332}
                        alt="СURT Z30 Plus"
                      />
                    </div>
                    <div className="edit-item-image__btn-wrap">
                      <button className="button button--small button--black-border edit-item-image__btn">
                        Заменить
                      </button>
                      <button className="button button--small button--black-border edit-item-image__btn">
                        Удалить
                      </button>
                    </div>
                  </div>
                  <div className="input-radio edit-item__form-radio">
                    <span>Тип товара</span>
                    <input
                      type="radio"
                      id="guitar"
                      name="item-type"
                      defaultValue="guitar"
                    />
                    <label htmlFor="guitar">Акустическая гитара</label>
                    <input
                      type="radio"
                      id="el-guitar"
                      name="item-type"
                      defaultValue="el-guitar"
                      defaultChecked
                    />
                    <label htmlFor="el-guitar">Электрогитара</label>
                    <input
                      type="radio"
                      id="ukulele"
                      name="item-type"
                      defaultValue="ukulele"
                    />
                    <label htmlFor="ukulele">Укулеле</label>
                  </div>
                  <div className="input-radio edit-item__form-radio">
                    <span>Количество струн</span>
                    <input
                      type="radio"
                      id="string-qty-4"
                      name="string-qty"
                      defaultValue={4}
                      defaultChecked
                    />
                    <label htmlFor="string-qty-4">4</label>
                    <input
                      type="radio"
                      id="string-qty-6"
                      name="string-qty"
                      defaultValue={6}
                    />
                    <label htmlFor="string-qty-6">6</label>
                    <input
                      type="radio"
                      id="string-qty-7"
                      name="string-qty"
                      defaultValue={7}
                    />
                    <label htmlFor="string-qty-7">7</label>
                    <input
                      type="radio"
                      id="string-qty-12"
                      name="string-qty"
                      defaultValue={12}
                    />
                    <label htmlFor="string-qty-12">12</label>
                  </div>
                </div>
                <div className="edit-item__form-right">
                  <div className="custom-input edit-item__form-input">
                    <label>
                      <span>Дата добавления товара</span>
                      <input
                        type="text"
                        name="date"
                        defaultValue="19.09.2022"
                        placeholder="Дата в формате 00.00.0000"
                        readOnly
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-input edit-item__form-input">
                    <label>
                      <span>Наименование товара</span>
                      <input
                        type="text"
                        name="title"
                        defaultValue="СURT Z30 Plus"
                        placeholder="Наименование"
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-input edit-item__form-input edit-item__form-input--price">
                    <label>
                      <span>Цена товара</span>
                      <input
                        type="text"
                        name="price"
                        defaultValue="27 000"
                        placeholder="Цена в формате 00 000"
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-input edit-item__form-input">
                    <label>
                      <span>Артикул товара</span>
                      <input
                        type="text"
                        name="sku"
                        defaultValue="SO757575"
                        placeholder="Артикул товара"
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-textarea edit-item__form-textarea">
                    <label>
                      <span>Описание товара</span>
                      <textarea
                        name="description"
                        placeholder=""
                        defaultValue={
                          'Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений.\n Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.'
                        }
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                </div>
                <div className="edit-item__form-buttons-wrap">
                  <button
                    className="button button--small edit-item__form-button"
                    type="submit"
                  >
                    Сохранить изменения
                  </button>
                  <button
                    className="button button--small edit-item__form-button"
                    type="button"
                  >
                    Вернуться к списку товаров
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
