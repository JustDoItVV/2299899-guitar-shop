import { GuitarWithPhoto, Pagination } from '@guitar-shop/types';

import GuitarItem from '../guitar-item/guitar-item';

type GuitarsListProps = {
  pagination: Pagination<GuitarWithPhoto>;
};

export default function GuitarsList(props: GuitarsListProps): JSX.Element {
  const { pagination } = props;

  const items = pagination
    ? pagination.entities.map((guitar) => (
        <GuitarItem guitar={guitar} key={`guitar-item-${guitar.id}`} />
      ))
    : [];

  return <ul className="catalog-cards__list">{items}</ul>;
}
