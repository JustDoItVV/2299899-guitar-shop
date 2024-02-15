import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useRef,
  useState,
} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { DATE_FORMAT, PUBLISH_DATE_FORMAT } from '@guitar-shop/consts';
import { postGuitarAction, redirectToRoute } from '@guitar-shop/storage';
import { AppRoute, GuitarType } from '@guitar-shop/types';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';
import { useAppDispatch } from '../../hooks';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default function AddPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<GuitarType>(GuitarType.Accustic);
  const guitarStringsRef = useRef<string>('4');
  const publishDateRef = useRef<string>('');
  const titleRef = useRef<string>('');
  const priceRef = useRef<string>('');
  const vendorCodeRef = useRef<string>('');
  const descriptionRef = useRef<string>('');

  const [imagePreview, setImagePreview] = useState<JSX.Element | null>(null);

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
      setImagePreview(null);
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
      setImagePreview(null);
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
          PUBLISH_DATE_FORMAT
        )
          .local()
          .toISOString();
      }
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData();

    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      formData.append('file', fileInputRef.current.files[0]);
    } else {
      toast.error('Photo is required');
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

    dispatch(postGuitarAction(formData));
  };

  const handleBackButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(redirectToRoute(AppRoute.Catalog));
  };

  return (
    <div>
      <Helmet>
        <title>Добавление товара — Guitar-shop</title>
      </Helmet>
      <SvgIcons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <section className="add-item">
            <div className="container">
              <h1 className="add-item__title">Новый товар</h1>
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
                  <Link className="link" to={AppRoute.Add}>
                    Новый товар
                  </Link>
                </li>
              </ul>
              <form
                className="add-item__form"
                action="#"
                method="post"
                onSubmit={handleFormSubmit}
              >
                <div className="add-item__form-left">
                  <div className="edit-item-image add-item__form-image">
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
                        Добавить
                      </button>
                      <button
                        className="button button--small button--black-border edit-item-image__btn"
                        onClick={handleClearFileButtonClick}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                  <div className="input-radio add-item__form-radio">
                    <span>Выберите тип товара</span>
                    <input
                      type="radio"
                      id="guitar"
                      name="type"
                      defaultValue={GuitarType.Accustic}
                      onClick={getRadioButtonClickHandler<GuitarType>(typeRef)}
                      defaultChecked
                    />
                    <label htmlFor="guitar">Акустическая гитара</label>
                    <input
                      type="radio"
                      id="el-guitar"
                      name="type"
                      defaultValue={GuitarType.Electro}
                      onClick={getRadioButtonClickHandler<GuitarType>(typeRef)}
                    />
                    <label htmlFor="el-guitar">Электрогитара</label>
                    <input
                      type="radio"
                      id="ukulele"
                      name="type"
                      defaultValue={GuitarType.Ukulele}
                      onClick={getRadioButtonClickHandler<GuitarType>(typeRef)}
                    />
                    <label htmlFor="ukulele">Укулеле</label>
                  </div>
                  <div className="input-radio add-item__form-radio">
                    <span>Количество струн</span>
                    <input
                      type="radio"
                      id="string-qty-4"
                      name="guitarStrings"
                      defaultValue={4}
                      onClick={getRadioButtonClickHandler<string>(
                        guitarStringsRef
                      )}
                      defaultChecked
                    />
                    <label htmlFor="string-qty-4">4</label>
                    <input
                      type="radio"
                      id="string-qty-6"
                      name="guitarStrings"
                      onClick={getRadioButtonClickHandler<string>(
                        guitarStringsRef
                      )}
                      defaultValue={6}
                    />
                    <label htmlFor="string-qty-6">6</label>
                    <input
                      type="radio"
                      id="string-qty-7"
                      name="guitarStrings"
                      onClick={getRadioButtonClickHandler<string>(
                        guitarStringsRef
                      )}
                      defaultValue={7}
                    />
                    <label htmlFor="string-qty-7">7</label>
                    <input
                      type="radio"
                      id="string-qty-12"
                      name="guitarStrings"
                      onClick={getRadioButtonClickHandler<string>(
                        guitarStringsRef
                      )}
                      defaultValue={12}
                    />
                    <label htmlFor="string-qty-12">12</label>
                  </div>
                </div>
                <div className="add-item__form-right">
                  <div className="custom-input add-item__form-input">
                    <label>
                      <span>Дата добавления товара</span>
                      <input
                        type="text"
                        name="publishDate"
                        defaultValue=""
                        placeholder={`Дата в формате ${dayjs().format(
                          DATE_FORMAT
                        )}`}
                        onChange={handlePublishDateInputChange}
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-input add-item__form-input">
                    <label>
                      <span>Введите наименование товара</span>
                      <input
                        type="text"
                        name="title"
                        defaultValue=""
                        placeholder="Наименование"
                        required
                        onChange={getInputChangeHandler<
                          string,
                          HTMLInputElement
                        >(titleRef)}
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                    <label>
                      <span>Введите цену товара</span>
                      <input
                        type="text"
                        name="price"
                        defaultValue=""
                        placeholder="Цена в формате 000 000"
                        required
                        onChange={getInputChangeHandler<
                          string,
                          HTMLInputElement
                        >(priceRef)}
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-input add-item__form-input">
                    <label>
                      <span>Введите артикул товара</span>
                      <input
                        type="text"
                        name="vendorCode"
                        defaultValue=""
                        placeholder="Артикул товара"
                        required
                        onChange={getInputChangeHandler<
                          string,
                          HTMLInputElement
                        >(vendorCodeRef)}
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-textarea add-item__form-textarea">
                    <label>
                      <span>Введите описание товара</span>
                      <textarea
                        name="description"
                        placeholder=""
                        defaultValue=""
                        required
                        onChange={getInputChangeHandler<
                          string,
                          HTMLTextAreaElement
                        >(descriptionRef)}
                      />
                    </label>
                    <p>Заполните поле</p>
                  </div>
                </div>
                <div className="add-item__form-buttons-wrap">
                  <button
                    className="button button--small add-item__form-button"
                    type="submit"
                  >
                    Сохранить изменения
                  </button>
                  <button
                    className="button button--small add-item__form-button"
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
