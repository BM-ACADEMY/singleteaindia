import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { showToast } from "@/utils/customToast";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null); // For editing menu title
  const [editingProductIndex, setEditingProductIndex] = useState(null); // For editing individual product

  // Fetch menus
  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/menus");
      setMenus(res.data.data);
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to fetch menus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Delete full menu
  const handleDeleteMenu = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return;
    try {
      await axiosInstance.delete(`/menus/${id}`);
      showToast("success", "Menu deleted successfully");
      fetchMenus();
    } catch (error) {
      showToast("error", "Error deleting menu");
    }
  };

  // Delete a product inside a menu
  const handleDeleteProduct = async (menuId, productIndex) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/menus/${menuId}/products/${productIndex}`);
      showToast("success", "Product deleted successfully");
      fetchMenus();
    } catch (error) {
      showToast("error", "Error deleting product");
    }
  };

  // Handle menu title change
  const handleTitleChange = (e) => {
    setEditingMenu({ ...editingMenu, title: e.target.value });
  };

  // Handle product field changes
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...editingMenu.products];
    if (field === "image" && value) {
      updatedProducts[index].preview = URL.createObjectURL(value); // Create preview URL
    }
    updatedProducts[index][field] = value;
    setEditingMenu({ ...editingMenu, products: updatedProducts });
  };

  // Start editing a product
  const startEditingProduct = (menuId, productIndex) => {
    const menu = menus.find((m) => m._id === menuId);
    setEditingMenu({
      id: menu._id,
      title: menu.title,
      products: menu.products.map((p, i) => ({
        ...p,
        image: null,
        preview: p.image_url || null,
      })),
    });
    setEditingProductIndex(productIndex);
  };

  // Save edited menu or product
  const handleSaveEdit = async (menuId) => {
    try {
      const formData = new FormData();
      formData.append("title", editingMenu.title);
      formData.append(
        "products",
        JSON.stringify(
          editingMenu.products.map((p) => ({
            name: p.name,
            quantity: p.quantity,
            price: p.price,
            image_url: p.image_url, // Preserve existing image_url
          }))
        )
      );

      // Append new images
      editingMenu.products.forEach((p) => {
        if (p.image) formData.append("images", p.image);
      });

      await axiosInstance.put(`/menus/${menuId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Clean up previews
      editingMenu.products.forEach((p) => {
        if (p.preview) URL.revokeObjectURL(p.preview);
      });

      showToast("success", "Menu updated successfully");
      setEditingMenu(null);
      setEditingProductIndex(null);
      fetchMenus();
    } catch (error) {
      console.error(error);
      showToast("error", "Error updating menu");
    }
  };

  // Cancel editing and clean up previews
  const handleCancelEdit = () => {
    editingMenu?.products.forEach((p) => {
      if (p.preview) URL.revokeObjectURL(p.preview);
    });
    setEditingMenu(null);
    setEditingProductIndex(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <p className="ml-2 text-gray-600">Loading menus...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6  min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Menu List</h2>

      {menus.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No menus available.</p>
      )}

      {menus.map((menu) => (
        <div
          key={menu._id}
          className="mb-8 p-6 rounded-xl transition-shadow"
        >
          {/* Menu Header */}
          <div className="flex justify-between items-center mb-6">
            {editingMenu?.id === menu._id ? (
              <input
                type="text"
                value={editingMenu.title}
                onChange={handleTitleChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter menu title"
              />
            ) : (
              <h3 className="text-2xl font-semibold text-gray-800">{menu.title}</h3>
            )}

            <div className="space-x-3">
              {editingMenu?.id === menu._id ? (
                <>
                  <button
                    onClick={() => handleSaveEdit(menu._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setEditingMenu({
                        id: menu._id,
                        title: menu.title,
                        products: menu.products.map((p) => ({
                          ...p,
                          image: null,
                          preview: p.image_url || null,
                        })),
                      })
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Title
                  </button>
                  <button
                    onClick={() => handleDeleteMenu(menu._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Menu
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="grid md:grid-cols-3 gap-6">
            {menu.products.map((product, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image Preview */}
                {(product.image_url || (editingMenu?.id === menu._id && editingMenu.products[index]?.preview)) && (
                  <img
                    src={
                      editingMenu?.id === menu._id && editingMenu.products[index]?.preview
                        ? editingMenu.products[index].preview
                        : product.image_url
                    }
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}

                {editingMenu?.id === menu._id && editingProductIndex === index ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editingMenu.products[index].name}
                      onChange={(e) => handleProductChange(index, "name", e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Product name"
                    />
                    <input
                      type="text"
                      value={editingMenu.products[index].quantity}
                      onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Quantity (e.g., 250g)"
                    />
                    <input
                      type="number"
                      value={editingMenu.products[index].price}
                      onChange={(e) => handleProductChange(index, "price", e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Price"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleProductChange(index, "image", e.target.files[0])}
                      className="w-full text-sm text-gray-600"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(menu._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save Product
                      </button>
                      <button
                        onClick={() => setEditingProductIndex(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.quantity}</p>
                    <p className="font-bold text-gray-800">₹{product.price}</p>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => startEditingProduct(menu._id, index)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        Edit Product
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(menu._id, index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Delete Product
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;