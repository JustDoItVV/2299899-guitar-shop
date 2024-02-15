import { GuitarWithPhoto, Pagination } from '@guitar-shop/types';

export type GuitarProcess = {
  guitars: Pagination<GuitarWithPhoto> | null;
  guitar: GuitarWithPhoto | null;
  isLoading: boolean;
  page: number;
};
