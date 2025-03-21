const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category'); // Aby obsługiwać kategorię
const router = express.Router();

// Pobieranie wszystkich produktów
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category'); // populate do załadowania kategorii
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
});

// Pobieranie produktu po ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (err) {
    res.status(500).send('Error fetching product');
  }
});

// Dodawanie nowego produktu
router.post('/', async (req, res) => {
  const { name, description, price, stock, category, imageUrl } = req.body;
  if (!name || !description || !price || !stock || !category) {
    return res.status(400).send('All fields are required');
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).send('Error creating product');
  }
});

// Edytowanie produktu
router.put('/:id', async (req, res) => {
  const { name, description, price, stock, category, imageUrl } = req.body;
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, category, imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).send('Error updating product');
  }
});

// Usuwanie produktu
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).send('Error deleting product');
  }
});

// Filtrowanie produktów po kategorii
router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching products by category');
  }
});

// Filtrowanie produktów według ceny
router.get('/price', async (req, res) => {
  const { min, max } = req.query;
  try {
    const products = await Product.find({
      price: { $gte: min, $lte: max },
    }).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching products by price');
  }
});

module.exports = router;
