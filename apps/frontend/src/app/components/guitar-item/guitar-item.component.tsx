import dayjs from 'dayjs';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { DATE_FORMAT } from '@guitar-shop/consts';
import { deleteGuitarAction } from '@guitar-shop/storage';
import { AppRoute, GuitarWithPhoto } from '@guitar-shop/types';

import { useAppDispatch } from '../../hooks';

type GuitarItemProps = {
  guitar: GuitarWithPhoto;
};

export default function GuitarItem(props: GuitarItemProps): JSX.Element {
  const { guitar } = props;
  const dispatch = useAppDispatch();

  let publishDate = '';
  if (guitar.publishDate) {
    publishDate = dayjs(guitar.publishDate).format(DATE_FORMAT);
  }

  const handleDeleteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (guitar.id) {
      dispatch(deleteGuitarAction(guitar.id));
    }
  };

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img
          src={guitar.photoUrl}
          srcSet={`${guitar.photoUrl} 2x`}
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
            Дата добавления {publishDate}
          </p>
          <p className="catalog-item__data-price">
            {guitar.price.toLocaleString().replace(/,/g, ' ')} ₽
          </p>
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
          onClick={handleDeleteButtonClick}
        >
          Удалить
        </button>
      </div>
    </li>
  );
}
