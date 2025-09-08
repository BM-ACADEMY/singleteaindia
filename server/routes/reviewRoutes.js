const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// CRUD Routes
router.post("/", reviewController.createReview);       // Create
router.get("/", reviewController.getReviews);          // Read all
router.get("/:id", reviewController.getReviewById);    // Read one
router.put("/:id", reviewController.updateReview);     // Update
router.delete("/:id", reviewController.deleteReview);  // Delete

module.exports = router;
