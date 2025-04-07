const express = require("express");
const mongoose = require("mongoose");
const Announcement = require("../models/Announcement");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ message: "Error fetching announcements" });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findById(id);
    
    if (!announcement) {
      return res.status(404).send('Announcement not found');
    }

    res.json(announcement);
  } catch (err) {
    console.error(`Error fetching announcement with ID: ${id}`, err);
    res.status(500).send('Error fetching announcement');
  }
});


router.post("/", async (req, res) => {
  const { title, header, content, color } = req.body;

  if (!title || !header || !content || !color) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newAnnouncement = new Announcement({ title, header, content, color });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error("Error creating announcement:", err);
    res.status(500).json({ message: "Error creating announcement" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, header, content, color } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid announcement ID" });
  }

  if (!title || !header || !content || !color) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updated = await Announcement.findByIdAndUpdate(
      id,
      { title, header, content, color },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating announcement:", err);
    res.status(500).json({ message: "Error updating announcement" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid announcement ID" });
  }

  try {
    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.status(500).json({ message: "Error deleting announcement" });
  }
});

module.exports = router;
