import { Link } from 'react-router-dom';

export default function GuitarItem(): JSX.Element {
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
          <Link className="link" to="./product">
            <p className="catalog-item__data-title">
              ЭлектроГитара Честер bass
            </p>
          </Link>
          <br />
          <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
          <p className="catalog-item__data-price">17 500 ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link
          className="button button--small button--black-border"
          to="./product/edit"
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
