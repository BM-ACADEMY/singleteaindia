import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";

export const FranchisesMenu = () => {
  const [franchises, setFranchises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const res = await axiosInstance.get("/franchises");
        setFranchises(res.data);
      } catch (err) {
        console.error("Error fetching franchises:", err.message);
      }
    };
    fetchFranchises();
  }, []);

  const totalBranches = franchises.length;

  const headingVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 50 },
    visible: (i) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="py-16 bg-gray-50">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900">
          FROM A SINGLE OUTLET TO <span className="text-[#f79100]">{totalBranches}</span>+
        </h1>
      </motion.div>

      {/* Franchise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 sm:px-12">
        {franchises.map((branch, index) => (
          <motion.div
            key={branch._id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/franchise/${branch._id}`)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={branch.images_url?.[0] || "https://via.placeholder.com/400"}
                alt={branch.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex flex-col justify-between h-32">
              <h2 className="text-lg font-semibold text-gray-800">{branch.title}</h2>
              <button className="mt-auto flex items-center justify-center gap-2 text-[#f79100 font-medium hover:text-[#f79100">
                Click Here <FiArrowRight />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
