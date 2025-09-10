import React from "react";
import BlurText from "@/components/BlurText";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";
import { motion } from "framer-motion";

const Contacttitle = () => {
  return (
    <div className="py-24"> {/* Top + Bottom spacing without using mt */}
      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto rounded-br-[50px] rounded-tl-[20px] p-6 sm:p-10">
        {/* Heading with Blur Animation */}
        <h2 className="text-center text-3xl sm:text-6xl font-extrabold leading-snug">
          <span className="inline-block text-black">
            <BlurText
              text="START YOUR"
              delay={100}
              animateBy="words"
              direction="top"
            />
          </span>{" "}
          <span className="inline-block text-[#f69522]">
            <BlurText
              text="CHAI FRANCHISE IN"
              delay={200}
              animateBy="words"
              direction="top"
            />
          </span>{" "}
          <span className="inline-block text-black">
            <BlurText
              text="INDIA WITH SINGLE TEA!"
              delay={300}
              animateBy="words"
              direction="top"
            />
          </span>
        </h2>

        {/* Description with Motion Blur Reveal */}
        <div className="mt-6 text-center text-sm sm:text-base font-medium leading-relaxed text-gray-800">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            LOOKING TO START YOUR OWN TEA BUSINESS? JOIN THE FASTEST GROWING
            CHAI FRANCHISE IN INDIA WITH SINGLE TEA! FILL OUT THE ENQUIRY FORM TO
            GET STARTED. WE OFFER COMPLETE SUPPORT, LOW INVESTMENT, AND HIGH
            RETURNS. BE YOUR OWN BOSS WITH TEABOY’S TRUSTED FRANCHISE MODEL.
            LET’S BREW SUCCESS TOGETHER!
          </motion.p>
        </div>
      </div>

      {/* Velocity Scrolling Text */}
      <ScrollVelocityContainer className="text-[#f69522] font-extrabold mb-3 tracking-[-0.02em] text-4xl md:text-8xl md:leading-[5rem]">
        <ScrollVelocityRow baseVelocity={20} direction={1}>
          ONLY/- ₹2.49LAC
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
};

export default Contacttitle;
