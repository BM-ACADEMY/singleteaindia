"use client";
import { motion } from "framer-motion";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";
import logo from "@/assets/logobanner.png";

const TeaboyHeading = () => {
  return (
    <div className="relative flex items-center justify-center bg-[#f79100] py-16 px-6 overflow-hidden mt-22">
      {/* Single Tea Cup - visible only on small screens */}
      <motion.img
        src={logo}
        alt="Tea Cup"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-28 h-28 mr-6 sm:w-52 sm:h-52 hidden md:block lg:block"
      />

      {/* Animated Heading */}
      <motion.h1
        className="text-white font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center leading-tight"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        THE INCREDIBLE JOURNEY OF <br className="hidden sm:block" />
        SINGLE TEA FRANCHISES
      </motion.h1>
    </div>
  );
};

export default TeaboyHeading;
