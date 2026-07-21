"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, GlobeHemisphereWest, IdentificationBadge, ImagesSquare } from "@phosphor-icons/react";
import { Button } from "@workspace/ui/components/button";

const speciesImages = [
  {
    id: 1,
    name: "African Lion",
    url: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769410298/Saccoglossus_lr8wsu.png",
  },
  {
    id: 2,
    name: "Bengal Tiger",
    url: "https://res.cloudinary.com/duibfmcw1/image/upload/v1769410292/balanoglossus_z0bacg.png",
  },
  {
    id: 3,
    name: "Giant Panda",
    url: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102611/Chaetopleura_wp6ppp.png",
  },
  {
    id: 4,
    name: "African Elephant",
    url: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102652/Spondylus_ygtqnu.png",
  },
  {
    id: 5,
    name: "Sea Turtle",
    url: "https://res.cloudinary.com/duibfmcw1/image/upload/v1770102597/Architeuthes_m3fj02.png",
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setStart(true);
    }
  }

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-background">
      {/* Background industrial grid / subtle pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Radial gradient for a spotlight effect */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="container relative z-10 px-4 md:px-6 pt-6 pb-12 md:pt-8 md:pb-24 lg:pt-12 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary w-fit backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Learn Visually
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Build strong <span className="text-primary bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">zoology concepts</span> through interactive 3D models.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] border-l-4 border-primary/50 pl-4">
              Designed exclusively for students and researchers to explore the animal kingdom like never before.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full font-semibold h-12 px-8 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all">
              Explore Models
              <ArrowRight className="ml-2 h-4 w-4" weight="bold" />
            </Button>
            
          </div>

          <div className="pt-8 border-t border-border/50 grid grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1">
              <GlobeHemisphereWest className="h-6 w-6 text-primary mb-2" />
              <span className="text-2xl md:text-3xl font-bold">100+</span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">3D Models</span>
            </div>
            <div className="flex flex-col space-y-1">
              <IdentificationBadge className="h-6 w-6 text-primary mb-2" />
              <span className="text-2xl md:text-3xl font-bold">200+</span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Species</span>
            </div>
            <div className="flex flex-col space-y-1">
              <ImagesSquare className="h-6 w-6 text-primary mb-2" />
              <span className="text-2xl md:text-3xl font-bold">300+</span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Images</span>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Infinite Scrolling Images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        >
          <div
            ref={containerRef}
            className="w-full overflow-hidden absolute inset-0 flex items-center"
          >
            <ul
              ref={scrollerRef}
              className={`flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap ${
                start ? "animate-marquee" : ""
              }`}
            >
              {speciesImages.map((image, idx) => (
                <li
                  key={image.id + "-" + idx}
                  className="relative w-[280px] h-[380px] md:w-[320px] md:h-[420px] shrink-0 group flex items-center justify-center"
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-contain mix-blend-multiply dark:mix-blend-screen transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 768px) 280px, 320px"
                    priority={idx < 2}
                  />
                  <div className="absolute bottom-4 left-0 right-0 text-center z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground font-semibold text-sm tracking-tight shadow-lg">
                      {image.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
