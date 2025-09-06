const Franchise = require("../model/Franchise");

// Get all franchises
exports.getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();
    res.json(franchises);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get single franchise by ID
exports.getFranchiseById = async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.id);
    if (!franchise) return res.status(404).json({ message: "Franchise not found" });
    res.json(franchise);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create franchise
exports.createFranchise = async (req, res) => {
  try {
    const { title, content_text, images_url } = req.body;
    const franchise = await Franchise.create({ title, content_text, images_url });
    res.status(201).json(franchise);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update franchise
exports.updateFranchise = async (req, res) => {
  try {
    const { title, content_text, images_url } = req.body;
    const franchise = await Franchise.findByIdAndUpdate(
      req.params.id,
      { title, content_text, images_url },
      { new: true }
    );
    if (!franchise) return res.status(404).json({ message: "Franchise not found" });
    res.json(franchise);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete franchise
exports.deleteFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findByIdAndDelete(req.params.id);
    if (!franchise) return res.status(404).json({ message: "Franchise not found" });
    res.json({ message: "Franchise deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
