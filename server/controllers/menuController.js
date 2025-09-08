const Menu = require("../model/Menu");
const path = require("path");
const fs = require("fs").promises; // Use promises-based fs for async operations

// Get all menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json({
      success: true,
      data: menus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching menus",
      error: error.message,
    });
  }
};

// Get single menu by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }
    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching menu",
      error: error.message,
    });
  }
};

// Create a new menu with multiple product images
exports.createMenu = async (req, res) => {
  try {
    const { title, products } = req.body;

    let parsedProducts = products;
    if (typeof products === "string") {
      parsedProducts = JSON.parse(products);
    }

    if (req.files && req.files.length > 0) {
      parsedProducts = parsedProducts.map((product, index) => {
        if (req.files[index]) {
          const imagePath = `${process.env.SERVER_URL}/upload/menu/${req.files[index].filename}`;
          return { ...product, image_url: imagePath };
        }
        return product;
      });
    }

    const newMenu = new Menu({
      title,
      products: parsedProducts,
    });

    const savedMenu = await newMenu.save();
    res.status(201).json({
      success: true,
      data: savedMenu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating menu",
      error: error.message,
    });
  }
};
// Update a menu by ID
exports.updateMenu = async (req, res) => {
  try {
    const { title, products } = req.body;

    let parsedProducts = products;
    if (typeof products === "string") {
      parsedProducts = JSON.parse(products);
    }

    const existingMenu = await Menu.findById(req.params.id);
    if (!existingMenu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    // Map uploaded images to products and delete old images if replaced
    if (req.files && req.files.length > 0) {
      parsedProducts = parsedProducts.map((product, index) => {
        if (req.files[index]) {
          // Delete the old image if it exists
          if (existingMenu.products[index]?.image_url) {
            const filename = path.basename(existingMenu.products[index].image_url);
            const filePath = path.join(__dirname, "..", "upload", "menu", filename);
            try {
              fs.unlink(filePath);
            } catch (err) {
              console.error(`Failed to delete old image ${filename}:`, err.message);
            }
          }
          const imagePath = `${process.env.SERVER_URL}/upload/menu/${req.files[index].filename}`;
          return { ...product, image_url: imagePath };
        }
        // Preserve existing image_url if no new image is uploaded
        return {
          ...product,
          image_url: existingMenu.products[index]?.image_url || product.image_url,
        };
      });
    }

    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      { title, products: parsedProducts },
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedMenu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating menu",
      error: error.message,
    });
  }
};

// Delete a menu by ID
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    // Delete all associated product images
    for (const product of menu.products) {
      if (product.image_url) {
        const filename = path.basename(product.image_url);
        const filePath = path.join(__dirname, "..", "upload", "menu", filename);
        try {
          await fs.unlink(filePath); // Delete the image file
        } catch (err) {
          console.error(`Failed to delete image ${filename}:`, err.message);
          // Continue with deletion even if an image fails to delete
        }
      }
    }

    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Menu and associated images deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting menu",
      error: error.message,
    });
  }
};

// New endpoint to delete a single product from a menu
exports.deleteProduct = async (req, res) => {
  try {
    const { menuId, productIndex } = req.params;

    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    if (productIndex < 0 || productIndex >= menu.products.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid product index",
      });
    }

    // Get the product to be deleted
    const product = menu.products[productIndex];
    if (product.image_url) {
      const filename = path.basename(product.image_url);
      const filePath = path.join(__dirname, "..", "upload", "menu", filename);
      try {
        await fs.unlink(filePath); // Delete the image file
      } catch (err) {
        console.error(`Failed to delete image ${filename}:`, err.message);
        // Continue with deletion even if the image fails to delete
      }
    }

    // Remove the product from the menu
    menu.products.splice(productIndex, 1);

    await menu.save();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};