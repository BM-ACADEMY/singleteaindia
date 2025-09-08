import React, { useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { showToast } from "@/utils/customToast";

const MenuForm = () => {
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([
    { name: "", quantity: "", price: "", image: null, preview: null },
  ]);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    if (field === "image" && value) {
      newProducts[index].preview = URL.createObjectURL(value); // Create preview URL
    }
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  // Add new product
  const addProduct = () => {
    setProducts([...products, { name: "", quantity: "", price: "", image: null, preview: null }]);
  };

  // Remove product
  const removeProduct = (index) => {
    if (products.length > 1) {
      const newProducts = products.filter((_, i) => i !== index);
      // Clean up preview URLs to avoid memory leaks
      if (products[index].preview) {
        URL.revokeObjectURL(products[index].preview);
      }
      setProducts(newProducts);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append(
        "products",
        JSON.stringify(
          products.map((p) => ({
            name: p.name,
            quantity: p.quantity,
            price: p.price,
          }))
        )
      );

      // Append images separately
      products.forEach((p) => {
        if (p.image) formData.append("images", p.image);
      });

      const res = await axiosInstance.post("/menus", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("success", "Menu created successfully!");
      setTitle("");
      // Clean up previews
      products.forEach((p) => {
        if (p.preview) URL.revokeObjectURL(p.preview);
      });
      setProducts([{ name: "", quantity: "", price: "", image: null, preview: null }]);
    } catch (error) {
      console.error(error);
      showToast("error", error.response?.data?.message || "Error creating menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Menu</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Heading */}
        <div>
          <label className="block font-medium">Main Heading</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Products Section */}
        <div className="space-y-6">
          {products.map((product, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3 relative">
              <h3 className="font-semibold">Product {index + 1}</h3>

              {/* Image Preview */}
              {product.preview && (
                <div className="mb-2">
                  <img
                    src={product.preview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}

              <input
                type="text"
                placeholder="Name"
                value={product.name}
                onChange={(e) => handleProductChange(index, "name", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />

              <input
                type="text"
                placeholder="Quantity (e.g. 250g)"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />

              <input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) => handleProductChange(index, "price", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleProductChange(index, "image", e.target.files[0])}
                className="w-full"
              />

              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="text-red-500 absolute top-2 right-2"
                >
                  ✖
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addProduct}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            + Add Product
          </button>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit Menu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;