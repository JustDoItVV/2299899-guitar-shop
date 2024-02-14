import { Guitar } from './guitar.interface';

export interface GuitarWithPhoto extends Guitar {
  photoUrl: string;
}
