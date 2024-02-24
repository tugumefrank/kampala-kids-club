"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export function SparklesPreview() {
  return (
    <div className="h-[60rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden sm:h-[50rem]">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      {/* <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Build great products
      </h1> bg-[#E2E8F0] */}
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
        <div className="flex flex-col justify-center gap-8">
          <h1 className="h1-bold text-white">
            Host, Connect, Celebrate: Your Events, Our Platform!
          </h1>
          <p className="p-regular-20 md:p-regular-24 text-white">
            Book and learn helpful tips from 3,168+ mentors in world-class
            companies with our global community.
          </p>
          <Button size="lg" asChild className="button w-full sm:w-fit">
            <Link href="#events">Explore Now</Link>
          </Button>
        </div>

        <Image
          src="/assets/images/hero.png"
          alt="hero"
          width={1000}
          height={1000}
          className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] z-10"
        />
      </div>
    </div>
  );
}
