"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const HeroCarousel = () => {
  const heroImages = [
    {
      imgUrl: "/assets/images/hero-1.svg",
      alt: "smart-watch",
    },
    {
      imgUrl: "/assets/images/hero-2.svg",
      alt: "bag",
    },
    {
      imgUrl: "/assets/images/hero-3.svg",
      alt: "lamp",
    },
    {
      imgUrl: "/assets/images/hero-4.svg",
      alt: "air-fryer",
    },
    {
      imgUrl: "/assets/images/hero-5.svg",
      alt: "chair",
    },
  ];

  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((heroImage) => (
          <Image
            key={heroImage.alt}
            alt={heroImage.alt}
            src={heroImage.imgUrl}
            width={484}
            height={484}
            className="object-contain"
          />
        ))}
      </Carousel>

      <Image
        src={"/assets/icons/hand-drawn-arrow.svg"}
        alt="handdrawn-arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroCarousel;
