"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full">
      {/* Mobile View: Carousel */}
      <div className="block md:hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={img}>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={img}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop View: Thumbnails + Main Image */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-4">
        {/* Thumbnails Column */}
        <div className="col-span-1 flex flex-col gap-4">
          {images.map((img, index) => (
            <button
              key={img}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all",
                selectedImage === index
                  ? "border-[#8F9B6B]"
                  : "border-transparent hover:border-gray-200",
              )}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="col-span-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={images[selectedImage]}
              alt="Product Main Image"
              fill
              className="object-cover transition-all duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
