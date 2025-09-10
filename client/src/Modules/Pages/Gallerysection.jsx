"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/api/axiosInstance"; // ✅ your axios setup
import Carousel from "@/components/ui/carousel";

export const Gallerysection = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get("/gallery");
        // ✅ Map response into your carousel format
        const formattedSlides = res.data.data.map((item) => ({
          src: import.meta.env.VITE_SERVER_URL + item.image_url, // prepend server URL
        }));
        setSlides(formattedSlides);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      {/* Heading + tagline */}
      <div className="text-center mb-12 px-4">
        <motion.h1
          className="relative text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-[#f79100] relative z-10">Our </span>{" "}
          <span className="relative z-10">Gallery</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Discover the power of our franchise network. From vibrant storefronts
          to community-driven experiences, our gallery showcases the essence of
          what makes us unique.
        </motion.p>
      </div>

      {/* Carousel */}
      {loading ? (
        <p className="text-center text-gray-500">Loading gallery...</p>
      ) : slides.length > 0 ? (
        <Carousel slides={slides} />
      ) : (
        <p className="text-center text-gray-500">No gallery images found.</p>
      )}
    </div>
  );
};
