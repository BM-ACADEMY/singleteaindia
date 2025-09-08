"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Menu from "@/assets/menu.jpg";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-[#f29517]">
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                SINGLE TEA
              </span>
            </h1>
          </>
        }>
        <img
          src={Menu}
          alt="hero"
          height={920}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>
  );
}
