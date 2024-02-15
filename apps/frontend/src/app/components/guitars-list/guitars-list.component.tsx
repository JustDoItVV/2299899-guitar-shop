import { selectGuitars } from '@guitar-shop/storage';

import { useAppSelector } from '../../hooks';
import GuitarItem from '../guitar-item/guitar-item';

export default function GuitarsList(): JSX.Element {
  const guitarsPagination = useAppSelector(selectGuitars);

  const items = guitarsPagination
    ? guitarsPagination.entities.map((guitar) => (
        <GuitarItem guitar={guitar} key={`guitar-item-${guitar.id}`} />
      ))
    : [];

  return <ul className="catalog-cards__list">{items}</ul>;
}
