require("mongoose");
require('../models/Category');

const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const Product = require('../models/Product');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

const processImage = async (filePath) => {
  const outputFilePath = filePath.replace(/\.\w+$/, '-resized.jpg');
  await sharp(filePath)
    .resize(300, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .toFile(outputFilePath);

  fs.unlinkSync(filePath);
  return outputFilePath.replace(/\\/g, '/').replace('uploads/', '/uploads/'); 
};

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    
    const updatedProducts = products.map(product => ({
      ...product.toObject(), 
      imageUrl: product.imageUrl && product.imageUrl.trim() !== "" 
        ? product.imageUrl 
        : "/images/No_Image_Available.jpg"
    }));

    res.json(updatedProducts);
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

    const updatedProduct = {
      ...product.toObject(),
      imageUrl: product.imageUrl && product.imageUrl.trim() !== "" 
        ? product.imageUrl 
        : "/images/No_Image_Available.jpg"
    };

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).send('Error fetching product');
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      imageUrl = await processImage(req.file.path);
    }

    const { name, description, price, stock, category } = req.body;

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
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let imageUrl = product.imageUrl;

    if (req.file) {
      if (product.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', product.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      imageUrl = await processImage(req.file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, category, imageUrl },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  console.log(`DELETE /products/${req.params.id} - Incoming request`);

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.warn(`Product with ID ${req.params.id} not found`);
      return res.status(404).send('Product not found');
    }

    console.log(`Found product: ${product.name} (ID: ${product._id})`);

    if (product.imageUrl) {
      const imagePath = `.${product.imageUrl}`;
      try {
        fs.unlinkSync(imagePath);
        console.log(`Deleted image at path: ${imagePath}`);
      } catch (err) {
        console.error(`Error deleting image file at ${imagePath}:`, err.message);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    console.log(`Deleted product with ID: ${req.params.id}`);

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(`Error while deleting product:`, err);
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
