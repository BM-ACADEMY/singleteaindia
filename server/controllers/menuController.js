const Menu = require("../model/Menu");
const fs = require("fs").promises;
const path = require("path");

// Get all menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get single menu by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create menu
exports.createMenu = async (req, res) => {
  try {
    const { title, content_text } = req.body;
    const image_url = req.file ? `upload/menu/${req.file.filename}` : null;

    const menu = await Menu.create({
      title,
      image_url,
      content_text: Array.isArray(content_text) ? content_text : JSON.parse(content_text || "[]"),
    });
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update menu
exports.updateMenu = async (req, res) => {
  try {
    const { title, content_text } = req.body;
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    // Delete old image if a new one is uploaded
    if (req.file && menu.image_url) {
      await fs.unlink(path.join(__dirname, "..", menu.image_url)).catch((err) =>
        console.error("Failed to delete old image:", err)
      );
    }

    // Update menu fields
    menu.title = title || menu.title;
    menu.image_url = req.file ? `upload/menu/${req.file.filename}` : menu.image_url;
    menu.content_text = Array.isArray(content_text)
      ? content_text
      : JSON.parse(content_text || "[]");

    await menu.save();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete menu
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    // Delete associated image
    if (menu.image_url) {
      await fs.unlink(path.join(__dirname, "..", menu.image_url)).catch((err) =>
        console.error("Failed to delete image:", err)
      );
    }

    res.json({ message: "Menu deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};