import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  images: string[];
  inStock: boolean;
  sizesEu: string[];
  sizesUs: string[];
  sizesMm: string[];
  rating: number;
  price: number;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  images: [{ type: String }],
  inStock: { type: Boolean, default: true },
  sizesEu: [{ type: String }],
  sizesUs: [{ type: String }],
  sizesMm: [{ type: String }],
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
}, { timestamps: true });

const Product = model<IProduct>('Product', ProductSchema);
export default Product; 