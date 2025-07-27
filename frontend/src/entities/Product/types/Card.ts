import { IProduct } from '@entities/Product/types/Product';

export interface ICard {
  data: IProduct;
  className: 'mini' | 'mid' | 'large' | 'default' | null;
  customPlaceLeft?: number;
  customPlaceRight?: number;
  customPlaceTop?: number;
  customPlaceBottom?: number;
}
