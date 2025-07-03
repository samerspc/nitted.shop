export interface IProduct {
  _id?: string;
  name: string;
  brand: string;
  images: string[];
  inStock: boolean;
  sizesEu: string[];
  sizesUs: string[];
  sizesMm: string[];
  rating: number;
  price: number;
  gender: 'male' | 'female';
  createdAt?: string;
  updatedAt?: string;
}
