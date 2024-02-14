import { Link } from 'react-router-dom';

import { dropToken } from '@guitar-shop/services';
import { selectUser, setAuthStatus, setUser } from '@guitar-shop/storage';
import { AppRoute, AuthStatus } from '@guitar-shop/types';

import { useAppDispatch, useAppSelector } from '../../hooks';

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleAvatarLinkClick = () => {
    dropToken();
    dispatch(setUser(null));
    dispatch(setAuthStatus(AuthStatus.NoAuth));
  };

  if (!user) {
    return (
      <header className="header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <Link className="header__logo logo" to={AppRoute.Login}>
              <img
                className="logo__img"
                width="70"
                height="70"
                src="./img/svg/logo.svg"
                alt="Логотип"
              />
            </Link>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to={AppRoute.Catalog}>
                    Каталог
                  </Link>
                </li>
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to="/info/where-to-buy">
                    Где купить?
                  </Link>
                </li>
                <li className="main-nav__item">
                  <Link
                    className="link main-nav__link"
                    to="/info/about-company"
                  >
                    О компании
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="header__container">
              <span className="header__user-name">Имя</span>
              <Link
                className="header__link"
                to={AppRoute.Login}
                aria-label="Перейти в личный кабинет"
              >
                <svg
                  className="header__link-icon"
                  width="12"
                  height="14"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-account"></use>
                </svg>
                <span className="header__link-text">Вход</span>
              </Link>
              <Link
                className="header__cart-link"
                to="/catalog/cart"
                aria-label="Перейти в корзину"
              >
                <svg
                  className="header__cart-icon"
                  width="14"
                  height="14"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-basket"></use>
                </svg>
                <span className="header__cart-count">2</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header--admin header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={AppRoute.Login}>
            <img
              className="logo__img"
              width="70"
              height="70"
              src="./img/svg/logo.svg"
              alt="Логотип"
            />
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={AppRoute.Catalog}>
                  Каталог
                </Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={AppRoute.Catalog}>
                  Список товаров
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__container">
            <span className="header__user-name">{user?.name}</span>
            <Link
              className="header__link"
              to={AppRoute.Login}
              aria-label="Перейти в личный кабинет"
              onClick={handleAvatarLinkClick}
            >
              <svg
                className="header__link-icon"
                width="12"
                height="14"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
