"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#F4F4F5]">
        <Image
          src={images[selectedImage]}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={img} // Using image URL as key since it's unique enough for thumbnails
            type="button"
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2",
              selectedImage === index
                ? "border-[#BA9659]"
                : "border-transparent hover:border-gray-200",
            )}
          >
            <Image
              src={img}
              alt={`${title} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
