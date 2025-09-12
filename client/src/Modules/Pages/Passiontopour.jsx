import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tea from "../../assets/tea.png";

gsap.registerPlugin(ScrollTrigger);

const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRefs = useRef([]);
  const vectorRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ Heading zoom animation (responsive)
      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          gsap.fromTo(
            headingRef.current,
            { scale: 0.9, opacity: 0, y: -40 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 40%",
                scrub: true,
              },
            }
          );
        },
        "(min-width: 768px)": () => {
          gsap.fromTo(
            headingRef.current,
            { scale: 0.85, opacity: 0, y: -60 },
            {
              scale: 1.2,
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        },
      });

      // ✅ Paragraphs fade + rise stagger
      textRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            delay: i * 0.2,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ✅ Floating tea vectors
      vectorRefs.current.forEach((vec, i) => {
        gsap.to(vec, {
          y: i % 2 === 0 ? 25 : -25,
          duration: 4 + i,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraphs = [
    "Single Tea was born out of a simple love – the love for a perfect cup of tea. Founded by Mr. N. Ganesan, a true tea enthusiast, the brand began with a dream to share his passion with the world. His journey wasn’t just about serving tea; it was about crafting an experience that blends taste, aroma, and warmth.",
    "With years of exploration and countless experiments, Mr. Ganesan worked tirelessly to refine what is now our signature Masala Tea. In fact, it took over 46 litres of milk and unending trials to perfect the unique flavor and fragrance that customers instantly fall in love with today.",
    "At Single Tea, we don’t just brew tea – we brew happiness, opportunities, and connections. Beyond our flavors, we also believe in empowering entrepreneurs by offering affordable franchise models, giving passionate individuals the chance to build their own success story.",
    "From one man’s love for tea to a brand that’s growing across cities, Single Tea stands as a symbol of tradition, innovation, and togetherness – all in a single cup.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center items-center px-6 overflow-hidden py-24 bg-gradient-to-b from-[#fffaf7] via-[#faeae6] to-[#fffaf7]"
    >
      {/* Floating vectors */}
      <img
        src={Tea}
        alt="leaf"
        ref={(el) => (vectorRefs.current[0] = el)}
        className="absolute top-20 left-10 w-16 opacity-50"
      />
      <img
        src={Tea}
        alt="leaf"
        ref={(el) => (vectorRefs.current[1] = el)}
        className="absolute bottom-32 right-12 w-20 opacity-50"
      />

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16" ref={headingRef}>
        <h2 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
          From Passion <span className="text-[#FF7A00]">to Pour</span>
        </h2>
        <span className="block w-20 h-1 bg-[#FF7A00] mx-auto mt-4 rounded-full"></span>
      </div>

      {/* Story paragraphs */}
      <div className="max-w-4xl mx-auto space-y-8 text-center md:text-left">
        {paragraphs.map((text, idx) => (
          <p
            key={idx}
            ref={(el) => (textRefs.current[idx] = el)}
            className="text-lg md:text-xl text-[#61412d] leading-relaxed tracking-wide font-medium"
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
