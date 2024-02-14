import { Guitar, Pagination } from '@guitar-shop/types';

export type GuitarProcess = {
  guitars: Pagination<Guitar> | null;
  isLoading: boolean;
};
