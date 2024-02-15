import { MouseEvent } from 'react';

import { selectGuitars, setPage } from '@guitar-shop/storage';

import { useAppDispatch, useAppSelector } from '../../hooks';

export default function PaginationControls(): JSX.Element {
  const dispatch = useAppDispatch();
  const paginationGuitars = useAppSelector(selectGuitars);

  if (!paginationGuitars) {
    return <div />;
  }

  const handlePageLinkClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    if (evt.currentTarget) {
      dispatch(setPage(evt.currentTarget.value));
    }
  };

  return (
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        <li
          className="pagination__page pagination__page--active"
          value={paginationGuitars.currentPage}
        >
          <a className="link pagination__page-link" href="/#">
            {paginationGuitars.currentPage}
          </a>
        </li>
        {paginationGuitars.currentPage + 1 <= paginationGuitars.totalPages && (
          <li
            className="pagination__page"
            value={paginationGuitars.currentPage + 1}
            onClick={handlePageLinkClick}
          >
            <a className="link pagination__page-link" href="/#">
              {paginationGuitars.currentPage + 1}
            </a>
          </li>
        )}
        {paginationGuitars.currentPage + 2 <= paginationGuitars.totalPages && (
          <li
            className="pagination__page"
            value={paginationGuitars.currentPage + 2}
            onClick={handlePageLinkClick}
          >
            <a className="link pagination__page-link" href="/#">
              {paginationGuitars.currentPage + 2}
            </a>
          </li>
        )}

        {paginationGuitars.currentPage + 2 <= paginationGuitars.totalPages && (
          <li
            className="pagination__page pagination__page--next"
            id="next"
            value={paginationGuitars.currentPage + 1}
            onClick={handlePageLinkClick}
          >
            <a className="link pagination__page-link" href="/#">
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
