import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/api/axiosInstance";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosInstance.get("/reviews");
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // Card Component
  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      {/* User Info */}
      <div className="flex gap-2 items-center">
        {/* Avatar with First Letter */}
        <div className="size-11 flex items-center justify-center rounded-full bg-[#f79100] text-white font-bold text-lg">
          {card.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <p className="font-medium">{card.name}</p>
          <span className="text-xs text-slate-500">⭐ {card.rating}/5</span>
        </div>
      </div>

      {/* Review Message */}
      <p className="text-sm py-4 text-gray-800">{card.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <span>Posted on Single Tea</span>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fbece8] pb-20">
      <motion.h1
        className="relative text-center text-4xl md:text-5xl lg:text-7xl pt-9 font-extrabold mb-6 tracking-tight leading-tight"
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <span className="text-[#f79100] relative z-10">Our Client </span>{" "}
        <span className="relative z-10">Testimonials</span>
      </motion.h1>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      {/* First Row (Left → Right) */}
      <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#fbece8] to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...reviews, ...reviews].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#fbece8] to-transparent"></div>
      </div>

      {/* Second Row (Right → Left) */}
      <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#fbece8] to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...reviews, ...reviews].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#fbece8] to-transparent"></div>
      </div>
    </div>
  );
};

export default Reviews;
