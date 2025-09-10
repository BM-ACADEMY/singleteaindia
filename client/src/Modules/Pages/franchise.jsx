import React, { useState, useEffect } from "react";
import LightGallery from "lightgallery/react";
import { motion } from "framer-motion";
import axiosInstance from "@/api/axiosInstance";

// LightGallery styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-pager.css";

// Plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgPager from "lightgallery/plugins/pager";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get("/franchise-gallery");
        setImages(res.data.data); // ✅ your controller returns {success, data: []}
      } catch (err) {
        console.error("Failed to fetch franchise gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = images.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center justify-center text-center text-black mb-16 rounded-2xl overflow-hidden p-8 md:p-12"
          initial={{ opacity: 0, filter: "blur(12px)", y: 50 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="relative text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-[#f79100] relative z-10">Our Franchise</span>{" "}
            <span className="relative z-10">Gallery</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover the power of our franchise network. From vibrant
            storefronts to community-driven experiences, our gallery showcases
            the essence of what makes us unique.
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <LightGallery
            selector="a"
            elementClassNames="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            plugins={[lgZoom, lgThumbnail, lgPager]}
            speed={500}
          >
            {currentImages.map((item, index) => (
              <motion.a
                key={item._id}
                data-src={`${import.meta.env.VITE_SERVER_URL}${item.image_url}`}
                data-sub-html={`<h4>${item.name}</h4>`}
                className="block relative group overflow-hidden rounded-lg shadow-md"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${item.image_url}`}
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-lg font-medium">
                    {item.name}
                  </h3>
                </div>
              </motion.a>
            ))}
          </LightGallery>
        ) : (
          <p className="text-center text-gray-500">No gallery items found.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-[#f79100] hover:text-white transition disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
                  currentPage === i + 1
                    ? "bg-[#f79100] text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-orange-400 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-[#f79100] hover:text-white transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
