const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    header: {
      type: String,
      required: true,
    },
    content: {
        type: String,
        required: true,
      },
  });
  
  const Announcement = mongoose.model('Announcement', announcementSchema);
  module.exports = Announcement;