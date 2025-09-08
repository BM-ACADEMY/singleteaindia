const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const upload = require("../middleware/multer");

// Routes
router.get("/", menuController.getAllMenus);
router.get("/:id", menuController.getMenuById);
router.post("/", upload.array("images"), menuController.createMenu);
router.put("/:id", upload.array("images"), menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);
router.delete("/:menuId/products/:productIndex", menuController.deleteProduct); // New endpoint

module.exports = router;