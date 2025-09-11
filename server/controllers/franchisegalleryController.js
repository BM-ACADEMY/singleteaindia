const FranchiseGallery = require("../model/franchiseGalleryModel");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs").promises;

// @desc    Create a new franchise gallery item
// @route   POST /api/franchise-gallery
// @access  Private
const createFranchiseGallery = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const file = req.file;

  if (!name || !file) {
    res.status(400);
    throw new Error("Name and image are required");
  }

  // Save FULL public URL to DB (recommended)
  const image_url = `${process.env.SERVER_URL || ""}/upload/franchiseGallery/${file.filename}`;

  const franchiseGallery = await FranchiseGallery.create({
    name,
    image_url,
  });

  res.status(201).json({
    success: true,
    data: franchiseGallery,
  });
});

// @desc    Get all franchise gallery items
// @route   GET /api/franchise-gallery
// @access  Public
const getFranchiseGalleries = asyncHandler(async (req, res) => {
  const franchiseGalleries = await FranchiseGallery.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: franchiseGalleries,
  });
});

// @desc    Get single franchise gallery item
// @route   GET /api/franchise-gallery/:id
// @access  Public
const getFranchiseGallery = asyncHandler(async (req, res) => {
  const franchiseGallery = await FranchiseGallery.findById(req.params.id);

  if (!franchiseGallery) {
    res.status(404);
    throw new Error("Franchise gallery item not found");
  }

  res.status(200).json({
    success: true,
    data: franchiseGallery,
  });
});

// @desc    Update franchise gallery item
// @route   PUT /api/franchise-gallery/:id
// @access  Private
const updateFranchiseGallery = asyncHandler(async (req, res) => {
  const franchiseGallery = await FranchiseGallery.findById(req.params.id);

  if (!franchiseGallery) {
    res.status(404);
    throw new Error("Franchise gallery item not found");
  }

  const { name } = req.body;
  let updateFields = {};
  if (name !== undefined) updateFields.name = name;

  if (req.file) {
    // Delete old image file from disk (robust handling)
    if (franchiseGallery.image_url) {
      try {
        // get filename (works whether image_url is full URL or relative path)
        const oldFilename = path.basename(franchiseGallery.image_url);
        const oldImagePath = path.join(__dirname, "..", "upload", "franchiseGallery", oldFilename);
        await fs.unlink(oldImagePath);
      } catch (err) {
        // log but don't throw — deletion failure shouldn't block update
        console.error(`Failed to delete old image: ${err.message}`);
      }
    }

    updateFields.image_url = `${process.env.SERVER_URL || ""}/upload/franchiseGallery/${req.file.filename}`;
  }

  const updatedFranchiseGallery = await FranchiseGallery.findByIdAndUpdate(
    req.params.id,
    updateFields,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: updatedFranchiseGallery,
  });
});

// @desc    Delete franchise gallery item
// @route   DELETE /api/franchise-gallery/:id
// @access  Private
const deleteFranchiseGallery = asyncHandler(async (req, res) => {
  const franchiseGallery = await FranchiseGallery.findById(req.params.id);

  if (!franchiseGallery) {
    res.status(404);
    throw new Error("Franchise gallery item not found");
  }

  // Delete associated image file
  if (franchiseGallery.image_url) {
    try {
      const filename = path.basename(franchiseGallery.image_url);
      const imagePath = path.join(__dirname, "..", "upload", "franchiseGallery", filename);
      await fs.unlink(imagePath);
    } catch (err) {
      console.error(`Failed to delete image: ${err.message}`);
    }
  }

  await franchiseGallery.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  createFranchiseGallery,
  getFranchiseGalleries,
  getFranchiseGallery,
  updateFranchiseGallery,
  deleteFranchiseGallery,
};
