"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { motion } from "framer-motion";
import { MorphingText } from "@/components/magicui/morphing-text";

const Menulistdisplay = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch menus from backend
  const fetchMenus = async () => {
    try {
      const response = await axiosInstance.get("/menus");
      console.log("Fetched menus:", response.data.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        setMenus(response.data.data);
      } else {
        setMenus([]);
      }
    } catch (err) {
      console.error("Error fetching menus:", err);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="text-xl font-medium text-gray-600 animate-pulse">
          Loading menus...
        </div>
      </div>
    );
  }

  if (!menus?.length) {
    return (
      <div className="flex justify-center items-center py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="text-xl font-medium text-gray-600">
          No menus available
        </div>
      </div>
    );
  }
  const texts = [
    "Menu's",
    "Dish Catalog",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#f29517] mb-20 text-center"
        initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <MorphingText texts={texts} />
      </motion.h2>

      {menus?.map((menu) => (
        <div key={menu._id || menu.id} className="mb-12">
          {/* Conditionally render Main Heading and Product Grid only if products exist */}
          {menu.products?.length > 0 && (
            <>
              {/* Centered Heading with Blur Effect */}
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f29517] mb-8 text-start"
                initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {menu.title
                  ? menu.title.charAt(0).toUpperCase() + menu.title.slice(1)
                  : "Untitled Menu"}
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menu.products.map((product, index) => (
                  <motion.div
                    key={product._id || index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    role="article"
                    aria-label={`Product: ${product.name || "Unnamed Product"}`}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Image */}
                    <img
                      src={
                        product.image_url ||
                        "https://via.placeholder.com/300x192?text=No+Image"
                      }
                      alt={product.name || "Product"}
                      className="w-full h-48 object-cover rounded-t-2xl"
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/300x192?text=No+Image";
                      }}
                    />
                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                        {product.name || "Unnamed Product"}
                        <span className="text-sm text-gray-500">
                          ({product.quantity || "-"})
                        </span>
                      </h3>
                      <p className="mt-3 text-lg font-bold text-[#f29517]">
                        ₹{product.price ?? "-"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menulistdisplay;
