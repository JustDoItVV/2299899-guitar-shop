import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import { DATE_FORMAT, PUBLISH_DATE_FORMAT } from '@guitar-shop/consts';
import {
  fetchGuitarAction,
  patchGuitarAction,
  redirectToRoute,
  selectGuitar,
  selectIsLoading,
} from '@guitar-shop/storage';
import { AppRoute, GuitarType } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';
import LoadingPage from '../../components/loading/loading.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFoundPage from '../not-found-page/not-found.page';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default function EditPage(): JSX.Element {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();

  const guitar = useAppSelector(selectGuitar);
  const isLoading = useAppSelector(selectIsLoading);

  const defaultImagePreview = (
    <img
      className="edit-item-image__image"
      src={guitar?.photoUrl}
      srcSet={`${guitar?.photoUrl} 2x`}
      width="133"
      height="332"
      alt="Preview"
    />
  );

  const [imagePreview, setImagePreview] = useState<JSX.Element | null>(
    defaultImagePreview
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<GuitarType>(guitar?.type || GuitarType.Accustic);
  const guitarStringsRef = useRef<string>(
    guitar?.guitarStrings.toString() || '4'
  );
  const publishDateRef = useRef<string>(guitar?.createdAt?.toString() || '');
  const titleRef = useRef<string>(guitar?.title || '');
  const priceRef = useRef<string>(guitar?.price.toString() || '');
  const vendorCodeRef = useRef<string>(guitar?.vendorCode || '');
  const descriptionRef = useRef<string>(guitar?.description || '');

  useEffect(() => {
    dispatch(fetchGuitarAction(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!guitar) {
    return <NotFoundPage />;
  }

  const handleFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget.files) {
      const file = evt.currentTarget.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(
        <img
          className="edit-item-image__image"
          src={imageUrl}
          srcSet={`${imageUrl} 2x`}
          width="133"
          height="332"
          alt="Preview"
        />
      );
    } else {
      setImagePreview(defaultImagePreview);
    }
  };

  const handleAddFileButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClearFileButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setImagePreview(defaultImagePreview);
    }
  };

  const getRadioButtonClickHandler =
    <T,>(ref: React.MutableRefObject<T>) =>
    (evt: MouseEvent<HTMLInputElement>) => {
      if (evt.currentTarget) {
        ref.current = evt.currentTarget.defaultValue as T;
      }
    };

  const getInputChangeHandler =
    <T, V extends HTMLInputElement | HTMLTextAreaElement>(
      ref: React.MutableRefObject<T>
    ) =>
    (evt: ChangeEvent<V>) => {
      if (evt.currentTarget) {
        ref.current = evt.currentTarget.value as T;
      }
    };

  const handlePublishDateInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget) {
      if (dayjs(evt.currentTarget.value, PUBLISH_DATE_FORMAT).isValid()) {
        publishDateRef.current = dayjs(
          evt.currentTarget.value,
          PUBLISH_DATE_FORMAT,
          true
        )
          .local()
          .toISOString();
      }
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData();

    if (fileInputRef.current?.files) {
      formData.append('file', fileInputRef.current.files[0]);
    }

    if (publishDateRef.current) {
      formData.append('publishDate', publishDateRef.current);
    }

    formData.append('type', typeRef.current);
    formData.append('guitarStrings', guitarStringsRef.current);
    formData.append('title', titleRef.current);
    formData.append('price', priceRef.current);
    formData.append('vendorCode', vendorCodeRef.current);
    formData.append('description', descriptionRef.current);

    dispatch(patchGuitarAction({ formData, id }));
    dispatch(redirectToRoute(AppRoute.Catalog));
  };

  const handleBackButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(redirectToRoute(AppRoute.Catalog));
  };

  const publishDate = dayjs(guitar.publishDate || '').format(DATE_FORMAT);

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
              <h1 className="edit-item__title">{guitar.title}</h1>
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
                    {guitar.title}
                  </Link>
                </li>
              </ul>
              <form
                className="edit-item__form"
                action="#"
                method="get"
                onSubmit={handleFormSubmit}
              >
                <div className="edit-item__form-left">
                  <div className="edit-item-image edit-item__form-image">
                    <div className="edit-item-image__image-wrap">
                      {imagePreview}
                    </div>
                    <div className="edit-item-image__btn-wrap">
                      <input
                        ref={fileInputRef}
                        id="fileInput"
                        type="file"
                        name="file"
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                      />
                      <button
                        className="button button--small button--black-border edit-item-image__btn"
                        onClick={handleAddFileButtonClick}
                      >
                        Заменить
                      </button>
                      <button
                        className="button button--small button--black-border edit-item-image__btn"
                        onClick={handleClearFileButtonClick}
                      >
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
                      defaultValue={GuitarType.Accustic}
                      defaultChecked={guitar.type === GuitarType.Accustic}
                      onClick={getRadioButtonClickHandler<GuitarType>(typeRef)}
                    />
                    <label htmlFor="guitar">Акустическая гитара</label>
                    <input
                      type="radio"
                      id="el-guitar"
                      name="item-type"
                      defaultValue={GuitarType.Electro}
                      defaultChecked={guitar.type === GuitarType.Electro}
                      onClick={getRadioButtonClickHandler<GuitarType>(typeRef)}
                    />
                    <label htmlFor="el-guitar">Электрогитара</label>
                    <input
                      type="radio"
                      id="ukulele"
                      name="item-type"
                      defaultValue={GuitarType.Ukulele}
                      defaultChecked={guitar.type === GuitarType.Ukulele}
                      onClick={getRadioButtonClickHandler<GuitarType>(typeRef)}
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
                      defaultChecked={guitar.guitarStrings === 4}
                      onClick={getRadioButtonClickHandler<string>(
                        guitarStringsRef
                      )}
                    />
                    <label htmlFor="string-qty-4">4</label>
                    <input
                      type="radio"
                      id="string-qty-6"
                      name="string-qty"
                      defaultValue={6}
                      defaultChecked={guitar.guitarStrings === 6}
                      onClick={getRadioButtonClickHandler<string>(
                        guitarStringsRef
                      )}
                    />
                    <label htmlFor="string-qty-6">6</label>
                    <input
                      type="radio"
                      id="string-qty-7"
                      name="string-qty"
                      defaultValue={7}
                      defaultChecked={guitar.guitarStrings === 7}
                      onClick={getRadioButtonClickHandler<string>(
                        guitarStringsRef
                      )}
                    />
                    <label htmlFor="string-qty-7">7</label>
                    <input
                      type="radio"
                      id="string-qty-12"
                      name="string-qty"
                      defaultValue={12}
                      defaultChecked={guitar.guitarStrings === 12}
                      onClick={getRadioButtonClickHandler<string>(
                        guitarStringsRef
                      )}
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
                        defaultValue={publishDate}
                        placeholder="Дата в формате 00.00.0000"
                        onChange={handlePublishDateInputChange}
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
                        defaultValue={guitar.title}
                        placeholder="Наименование"
                        onChange={getInputChangeHandler<
                          string,
                          HTMLInputElement
                        >(titleRef)}
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
                        defaultValue={guitar.price}
                        placeholder="Цена в формате 00 000"
                        onChange={getInputChangeHandler<
                          string,
                          HTMLInputElement
                        >(priceRef)}
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
                        defaultValue={guitar.vendorCode}
                        placeholder="Артикул товара"
                        onChange={getInputChangeHandler<
                          string,
                          HTMLInputElement
                        >(vendorCodeRef)}
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
                        defaultValue={guitar.description}
                        onChange={getInputChangeHandler<
                          string,
                          HTMLTextAreaElement
                        >(descriptionRef)}
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
                    onClick={handleBackButtonClick}
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
