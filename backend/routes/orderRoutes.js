const express = require("express");
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require("mongoose");
const { checkJwt } = require('../auth');

router.post('/', checkJwt, async (req, res) => {
  try {
    const {
      products,
      totalPrice,
      customerName,
      customerEmail,
      customerPhone,
      delivery,
      paymentMethod
    } = req.body;

    if (!products?.length || !totalPrice || !customerName || !customerEmail || !customerPhone || !delivery || !paymentMethod) {
      return res.status(400).json({ error: 'No values in the fields' });
    }

     for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for product ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      products,
      totalPrice,
      customerName,
      customerEmail,
      customerPhone,
      delivery,
      paymentMethod
    });

    const saved = await newOrder.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', checkJwt, async (req, res) => {
  try {
    const orders = await Order.find().populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', checkJwt, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/email/:email', checkJwt, async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await Order.find({ customerEmail: email }).populate('products.productId');
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this email.' });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', checkJwt, async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
