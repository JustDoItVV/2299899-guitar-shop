import { debounce } from 'lodash';
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Price } from '@guitar-shop/consts';
import {
  fetchGuitarsAction,
  selectGuitars,
  selectPage,
  setPage,
  setQuery,
} from '@guitar-shop/storage';
import { GuitarType, SortDirection, SortOption } from '@guitar-shop/types';

import { useAppDispatch, useAppSelector } from '../../hooks';
import GuitarItem from '../guitar-item/guitar-item.component';

export default function GuitarsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitarsPagination = useAppSelector(selectGuitars);
  const page = useAppSelector(selectPage);

  const [queryTypes, setQueryTypes] = useState<string[]>([]);
  const [queryGuitarStrings, setQueryGuitarStrings] = useState<string[]>([]);
  const [isArrayChanged, setIsArrayChanged] = useState<boolean>(false);
  const [querySortDirection, setQuerySortDirection] = useState<string>(
    SortDirection.Asc
  );
  const [querySortOption, setQuerySortOption] = useState<string>(
    SortOption.CreatedAt
  );
  const [queryPrice, setQueryPrice] = useState<[number, number]>([
    Price.Min,
    Price.Max,
  ]);

  useEffect(() => {
    if (guitarsPagination && page > guitarsPagination.totalPages) {
      dispatch(setPage(1));
    }
  }, [dispatch, guitarsPagination, page]);

  useEffect(() => {
    const queryStringSign =
      queryTypes.length !== 0 || querySortDirection || querySortOption
        ? '?'
        : '';
    const queryParams = [
      `sortDirection=${querySortDirection}`,
      `sortOption=${querySortOption}`,
      `page=${page}`,
    ];

    const query = `${queryStringSign}${queryParams
      .concat(queryTypes.map((type) => `type=${type}`))
      .concat(queryGuitarStrings.map((strings) => `guitarStrings=${strings}`))
      .concat(queryPrice.map((price) => `price=${price}`))
      .join('&')}`;
    dispatch(setQuery(query));
    dispatch(fetchGuitarsAction(query));
  }, [
    dispatch,
    page,
    queryTypes,
    queryGuitarStrings,
    querySortDirection,
    querySortOption,
    queryPrice,
    isArrayChanged,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQueryPrice = useCallback(
    debounce((value: [number, number]) => {
      setQueryPrice(value);
      setIsArrayChanged(!isArrayChanged);
    }, 500),
    []
  );

  const handlePriceMinInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget) {
      const value = parseInt(evt.currentTarget.value, 10);
      if (value) {
        debouncedSetQueryPrice([value, queryPrice[1]]);
      }
    }
  };
  const handlePriceMaxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget) {
      const value = parseInt(evt.currentTarget.value, 10);
      if (value) {
        debouncedSetQueryPrice([queryPrice[0], value]);
      }
    }
  };

  const handleTypeInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget) {
      const value = evt.currentTarget.value;

      if (queryTypes.includes(value)) {
        queryTypes.splice(queryTypes.indexOf(value), 1);
      } else {
        queryTypes.push(value);
      }

      setQueryTypes(queryTypes);
      setIsArrayChanged(!isArrayChanged);
    }
  };

  const handleGuitarsStringsInputChange = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    if (evt.currentTarget) {
      const value = evt.currentTarget.value;

      if (queryGuitarStrings.includes(value)) {
        queryGuitarStrings.splice(queryGuitarStrings.indexOf(value), 1);
      } else {
        queryGuitarStrings.push(value);
      }

      setQueryGuitarStrings(queryGuitarStrings);
      setIsArrayChanged(!isArrayChanged);
    }
  };

  const handleResetFormEvent = (evt: FormEvent<HTMLFormElement>) => {
    setQueryTypes([]);
    setQueryGuitarStrings([]);
    setIsArrayChanged(!isArrayChanged);
  };

  const handleSortOptionButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setQuerySortOption(evt.currentTarget.value);
  };

  const handleSortDirectionButtonClick = (
    evt: MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    setQuerySortDirection(evt.currentTarget.value);
  };

  const items = guitarsPagination
    ? guitarsPagination.entities.map((guitar) => (
        <GuitarItem guitar={guitar} key={`guitar-item-${guitar.id}`} />
      ))
    : [];

  const guitarMinPrice = guitarsPagination
    ? guitarsPagination.entities.reduce(
        (guitar, value) => {
          return guitar.price > value.price ? value : guitar;
        },
        { price: Price.Max }
      )
    : { price: Price.Max };

  const guitarMaxPrice = guitarsPagination
    ? guitarsPagination.entities.reduce(
        (guitar, value) => {
          return guitar.price < value.price ? value : guitar;
        },
        { price: Price.Min }
      )
    : { price: Price.Min };

  return (
    <div className="catalog">
      <form
        className="catalog-filter"
        action="#"
        method="post"
        onReset={handleResetFormEvent}
      >
        <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="catalog-filter__block-title">Цена</legend>
          <div className="form-input">
            <label htmlFor="priceMin">От </label>
            <input
              type="number"
              min={0}
              placeholder={guitarMinPrice.price.toString()}
              id="priceMin"
              name="priceMin"
              onChange={handlePriceMinInputChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="priceMax">До </label>
            <input
              type="number"
              placeholder={guitarMaxPrice.price.toString()}
              max={Price.Max}
              id="priceMax"
              name="priceMax"
              onChange={handlePriceMaxInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="catalog-filter__block-title">Тип гитар</legend>
          <div className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id="acoustic"
              name="acoustic"
              value={GuitarType.Accustic}
              onChange={handleTypeInputChange}
              checked={queryTypes.includes(GuitarType.Accustic)}
            />
            <label htmlFor="acoustic">Акустические гитары</label>
          </div>
          <div className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id="electric"
              name="electric"
              value={GuitarType.Electro}
              onChange={handleTypeInputChange}
              checked={queryTypes.includes(GuitarType.Electro)}
            />
            <label htmlFor="electric">Электрогитары</label>
          </div>
          <div className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id="ukulele"
              name="ukulele"
              value={GuitarType.Ukulele}
              onChange={handleTypeInputChange}
              checked={queryTypes.includes(GuitarType.Ukulele)}
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
              value={4}
              onChange={handleGuitarsStringsInputChange}
              checked={queryGuitarStrings.includes('4')}
            />
            <label htmlFor="4-strings">4</label>
          </div>
          <div className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id="6-strings"
              name="6-strings"
              value={6}
              onChange={handleGuitarsStringsInputChange}
              checked={queryGuitarStrings.includes('6')}
            />
            <label htmlFor="6-strings">6</label>
          </div>
          <div className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id="7-strings"
              name="7-strings"
              value={7}
              onChange={handleGuitarsStringsInputChange}
              checked={queryGuitarStrings.includes('7')}
            />
            <label htmlFor="7-strings">7</label>
          </div>
          <div className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id="12-strings"
              name="12-strings"
              value={12}
              onChange={handleGuitarsStringsInputChange}
              checked={queryGuitarStrings.includes('12')}
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
            className={`catalog-sort__type-button ${
              querySortOption === SortOption.CreatedAt
                ? 'catalog-sort__type-button--active'
                : ''
            }`}
            aria-label="по дате"
            value={SortOption.CreatedAt}
            onClick={handleSortOptionButtonClick}
          >
            по дате
          </button>
          <button
            className={`catalog-sort__type-button ${
              querySortOption === SortOption.Price
                ? 'catalog-sort__type-button--active'
                : ''
            }`}
            aria-label="по цене"
            value={SortOption.Price}
            onClick={handleSortOptionButtonClick}
          >
            по цене
          </button>
        </div>
        <div className="catalog-sort__order">
          <button
            className={`catalog-sort__order-button catalog-sort__order-button--up ${
              querySortDirection === SortDirection.Asc
                ? 'catalog-sort__order-button--active'
                : ''
            }`}
            aria-label="По возрастанию"
            value={SortDirection.Asc}
            onClick={handleSortDirectionButtonClick}
          />
          <button
            className={`catalog-sort__order-button catalog-sort__order-button--down ${
              querySortDirection === SortDirection.Desc
                ? 'catalog-sort__order-button--active'
                : ''
            }`}
            aria-label="По убыванию"
            value={SortDirection.Desc}
            onClick={handleSortDirectionButtonClick}
          />
        </div>
      </div>
      <div className="catalog-cards">
        <ul className="catalog-cards__list">{items}</ul>
      </div>
    </div>
  );
}
