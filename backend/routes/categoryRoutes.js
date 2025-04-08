const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/Category");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ message: "Error adding category", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ message: "Error updating category", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ message: "Error deleting category", error: err.message });
  }
});

module.exports = router;
