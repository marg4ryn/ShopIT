require("mongoose");
require('../models/Category');

const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

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

router.get('/filter', async (req, res) => {
    const { min, max, categories } = req.query;
    let query = {};
    if (min && max) {
      query.price = { $gte: min, $lte: max };
    }
    if (categories) {
      query.category = { $in: categories.split(',') };
    }
    try {
      const products = await Product.find(query).populate('category');
      res.json(products);
    } catch (err) {
      res.status(500).send('Error fetching filtered products');
    }
  });

module.exports = router;
