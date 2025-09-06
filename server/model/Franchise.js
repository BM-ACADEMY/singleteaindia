// models/Franchise.js
const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content_text: [{ type: String }], 
    images_url: { type: [String] }, // array supports multiple images
  },
  { timestamps: true }
);

module.exports = mongoose.model("Franchise", franchiseSchema);
