const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: String }, // e.g., "250g", "1 plate"
    price: { type: Number, required: true },
    image_url: { type: String }, // 👈 each product has its own image
  },
  { _id: false }
);

const menuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // main heading
    products: [productSchema], // multiple products with images
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
