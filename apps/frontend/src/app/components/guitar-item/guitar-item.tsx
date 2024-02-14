import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { DATE_FORMAT } from '@guitar-shop/consts';
import { AppRoute, Guitar } from '@guitar-shop/types';

type GuitarItemProps = {
  guitar: Guitar;
};

export default function GuitarItem(props: GuitarItemProps): JSX.Element {
  const { guitar } = props;

  let publishDate = dayjs();
  if (guitar.createdAt) {
    publishDate = dayjs(guitar.createdAt.toString());
  }

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img
          src="img/content/catalog-product-1.png"
          srcSet="img/content/catalog-product-1@2x.png 2x"
          width={36}
          height={93}
          alt="Картинка гитары"
        />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`/${guitar.id}`}>
            <p className="catalog-item__data-title">{guitar.title}</p>
          </Link>
          <br />
          <p className="catalog-item__data-date">
            Дата добавления {publishDate.format(DATE_FORMAT)}
          </p>
          <p className="catalog-item__data-price">{guitar.price} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link
          className="button button--small button--black-border"
          to={`/${guitar.id}${AppRoute.Edit}`}
          aria-label="Редактировать товар"
        >
          Редактировать
        </Link>
        <button
          className="button button--small button--black-border"
          type="submit"
          aria-label="Удалить товар"
        >
          Удалить
        </button>
      </div>
    </li>
  );
}
