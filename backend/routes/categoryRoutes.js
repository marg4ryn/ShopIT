const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send('Error fetching categories');
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send('Category name is required');

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).send('Error adding category');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).send('Category name is required');

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send('Category not found');
    }

    res.json(updatedCategory);
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).send('Error updating category');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return res.status(404).send('Category not found');
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).send('Error deleting category');
  }
});

module.exports = router;
