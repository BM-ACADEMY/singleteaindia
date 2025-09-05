import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.3
      }
    }
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: "#3B82F6",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Logo and Description Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold">B</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Logo
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Creating innovative digital solutions that transform businesses and enhance user experiences worldwide.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-4">
              {[
                { Icon: FaFacebookF, href: "#", color: "hover:bg-blue-600" },
                { Icon: FaLinkedinIn, href: "#", color: "hover:bg-blue-700" },
                { Icon: FaInstagram, href: "#", color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500" },
              ].map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  variants={socialIconVariants}
                  whileHover="hover"
                  className={`w-10 h-10 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${color} border border-gray-600/30`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Useful Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Useful Links
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Services', 'Portfolio', 'Blog', 'Careers'].map((link, index) => (
                <motion.li key={index}>
                  <motion.a
                    href="#"
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-gray-400 hover:text-white text-sm flex items-center space-x-2 transition-colors duration-200"
                  >
                    <FaArrowRight className="text-xs" />
                    <span>{link}</span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services/Products */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Services
            </h3>
            <ul className="space-y-3">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Digital Marketing', 'Cloud Solutions'].map((service, index) => (
                <motion.li key={index}>
                  <motion.a
                    href="#"
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-gray-400 hover:text-white text-sm flex items-center space-x-2 transition-colors duration-200"
                  >
                    <FaArrowRight className="text-xs" />
                    <span>{service}</span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contact Info
            </h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  123 Business Avenue,<br />
                  Tech City, TC 12345
                </p>
              </motion.div>
              <motion.a 
                href="tel:+1234567890"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaPhone className="text-blue-400 flex-shrink-0" />
                <p className="text-sm">+1 (234) 567-890</p>
              </motion.a>
              <motion.a 
                href="mailto:info@example.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <p className="text-sm">info@example.com</p>
              </motion.a>
            </div>
            
          </motion.div>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"
      />

      {/* Copyright Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-900/50 backdrop-blur-sm py-6"
      >
        <div className=" border-gray-700 py-4 text-center text-sm">
        © {year}{" "}
        <a
          href="https://bmtechx.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white font-semibold"
        >
          BMTechX
        </a>
        . All rights reserved.
      </div>
      </motion.div>
    </footer>
  );
};

export default Footer;