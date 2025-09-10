import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa"; // Import icons
import Logo from "@/assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const year = new Date().getFullYear();

const Footer = () => {
  const navigate = useNavigate();

  const handleFranchiseClick = () => {
    navigate("/contact");
  }

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left Side with Logo */}
        <div className="flex flex-col items-start md:w-1/3">
          {/* Bigger Logo (landscape-friendly) */}
          <img
            src={Logo}
            alt="Logo"
            className="w-64 h-auto mb-4 object-contain"
          />

          <h2 className="text-2xl font-bold mb-3 leading-snug">
            Be a Part of <span className="text-[#f79100]">Tea</span> Franchise
          </h2>

          <button onClick={handleFranchiseClick} className="cursor-pointer relative bg-white/10 py-2 rounded-full min-w-[8.5rem] min-h-[2.92rem] group max-w-full flex items-center justify-start hover:bg-[#f79100] transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080]">
            <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
              <div className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"></div>
              <div className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-[#f79100] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-black">
                <div className="size-[0.8rem] text-white group-hover:text-white group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    height="100%"
                    width="100%"
                  >
                    <path
                      fill="currentColor"
                      d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-white text-white">
              Franchise Enquiry
            </div>
          </button>
        </div>

        {/* Right Side Columns */}
        <div className="flex flex-col sm:flex-row justify-between md:w-2/3 gap-12">
          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/menu" className="hover:underline">
                  Menu
                </a>
              </li>
              <li>
                <a href="/franchise" className="hover:underline">
                  Franchise
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Policies</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Contact</h3>
            <p>singleteaindia@gmail.com</p>
            <p>
              <a href="tel:+919840622848" className="hover:underline">
                +91 9840622848
              </a>
            </p>
            <p>
              <a href="tel:+917397421913" className="hover:underline">
                +91 7397421913
              </a>
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/singleteaperumbakkam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-[#f79100] transition-colors"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://www.instagram.com/singleteafreezeyourtime?igsh=dDF0aTN1bDA3cXF0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-[#f79100] transition-colors"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      <div className="text-center text-sm text-gray-100">
        © {year}{" "}
        <a
          href="https://bmtechx.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#f79100] font-semibold"
        >
          BMTechX
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
