require('../models/Category');

const express = require('express');
const multer = require('multer');
const { checkJwt } = require('../auth');
const path = require('path');
const sharp = require('sharp');
const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs-extra');
const mongoose = require('mongoose');
const router = express.Router();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type, only JPEG and PNG are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const processImage = async (filePath) => {
  try {
    const { name } = path.parse(filePath);
    const newFilePath = path.join(__dirname, '..', 'uploads', `${name.trim().replace(/\s+/g, '-')}-resized.jpg`);
    const imageBuffer = await fs.promises.readFile(filePath);

    await sharp(imageBuffer)
      .resize(500)
      .toFormat('jpeg')
      .toFile(newFilePath);

    await fs.promises.unlink(filePath);
    return `/uploads/${path.basename(newFilePath)}`;
  } catch (err) {
    console.error(`Error processing image: ${err.message}`);
    throw new Error('Error processing image');
  }
};

const buildFilterQuery = async ({ min, max, categories, search }) => {
  const query = {};

  if (search && search.trim() !== '') {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [
      { name: { $regex: searchRegex } },
      { description: { $regex: searchRegex } }
    ];
  }

  if (min || max) {
    query.price = {};
    if (min && !isNaN(Number(min))) query.price.$gte = Number(min);
    if (max && !isNaN(Number(max))) query.price.$lte = Number(max);
  }

  if (categories && categories.trim() !== '') {
    const categoryNames = categories.split(',').map(name => name.trim());
    const foundCategories = await Category.find({ name: { $in: categoryNames } });

    if (foundCategories.length === 0) {
      throw new Error('No matching categories found');
    }

    const categoryIds = foundCategories.map(cat => cat._id);
    query.category = { $in: categoryIds };
  }

  return query;
};

router.get('/filter-all', async (req, res) => {
  const { min, max, categories, sort, search } = req.query;

  try {
    const query = await buildFilterQuery({ min, max, categories, search });

    const sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;

    const products = await Product.find(query)
      .populate('category')
      .sort(sortOption);

    const updatedProducts = products.map(product => {
      const productObj = product.toObject();
    
      if (!productObj.imageUrls || productObj.imageUrls.length === 0) {
        productObj.imageUrls = ["/images/No_Image_Available.jpg"];
      }
    
      return productObj;
    });
        
    res.json(updatedProducts);
  } catch (err) {
    console.error("Error fetching filtered products:", err);
    res.status(500).send({ message: 'Internal server error while fetching products' });
  }
});

router.get('/filter', async (req, res) => {
  const { min, max, categories, sort, search, page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    const query = await buildFilterQuery({ min, max, categories, search });

    const sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const updatedProducts = products.map(p => {
      const obj = p.toObject();
      if (!obj.imageUrls?.length) obj.imageUrls = ["/images/No_Image_Available.jpg"];
      return obj;
    });

    res.json({
      products: updatedProducts,
      hasMore: page * limit < totalProducts,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id).populate('category');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const productObj = product.toObject();
    res.json(productObj);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ message: 'Server error while fetching product', error: err.message });
  }
});

router.post('/', checkJwt, upload.array('images', 5), async (req, res) => {
  const imageUrls = [];

  try {
    if (req.files) {
      for (let file of req.files) {
        let imageUrl = await processImage(file.path);
        imageUrl = encodeURI(imageUrl);
        imageUrls.push(imageUrl);
      }
    }

    const { name, description, price, stock, category } = req.body;
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrls
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {   
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});

router.put('/:id', checkJwt, upload.array('images', 5), async (req, res) => {
  const { name, description, price, stock, category, deletedImages } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: `Product with id ${req.params.id} not found` });
    }

    let newImageUrls = [...product.imageUrls].map(url => url.replace(/\s+/g, ''));

    let deletedImagePaths = [];
    if (deletedImages) {
      try {
        deletedImagePaths = JSON.parse(deletedImages);
      } catch (e) {
        deletedImagePaths = Array.isArray(deletedImages) ? deletedImages : [deletedImages];
      }
      deletedImagePaths = deletedImagePaths.map(url => url.replace(/\s+/g, ''));

      for (let imageUrl of deletedImagePaths) {
        const oldImagePath = path.join(__dirname, '..', imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          newImageUrls = newImageUrls.filter(url => url !== imageUrl);
        }
      }
    }

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        let imageUrl = await processImage(file.path);
        imageUrl = imageUrl.replace(/\s+/g, '');
        newImageUrls.push(imageUrl);
      }
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.imageUrls = newImageUrls;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size is too large' });
    }
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

router.delete('/:id', checkJwt, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.warn(`Product with ID ${req.params.id} not found`);
      return res.status(404).json({ message: `Product with ID ${req.params.id} not found` });
    }

    if (product.imageUrls && product.imageUrls.length > 0) {
      for (let imageUrl of product.imageUrls) {
        const imagePath = path.join(__dirname, '..', imageUrl);

        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        } catch (err) {
          console.error(`Error deleting image file at ${imagePath}:`, err.message);
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error("Error while deleting product:", err);
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

module.exports = router;
