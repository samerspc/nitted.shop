import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

// Получить все товары
router.get('/', async (req, res) => {
  try {
    const { sortBy, order, gender } = req.query;
    const filter: any = {};
    if (gender === 'male' || gender === 'female') {
      filter.gender = gender;
    }
    let query = Product.find(filter);
    if (sortBy && (sortBy === 'rating' || sortBy === 'price')) {
      const sortOrder = order === 'asc' ? 1 : -1;
      query = query.sort({ [sortBy]: sortOrder });
    }
    const products = await query;
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Получить отдельный товар по id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Добавить новый товар
router.post('/', async (req, res) => {
  const { name, brand, images, inStock, sizesEu, sizesUs, sizesMm, rating, price, gender } = req.body;
  const product = new Product({ name, brand, images, inStock, sizesEu, sizesUs, sizesMm, rating, price, gender });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Изменить товар
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Удалить товар
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Увеличить рейтинг товара
router.post('/:id/increment-rating', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { rating: 1 } },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router; 