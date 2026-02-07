"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
}

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="space-y-8 py-12">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-normal text-[#333333] md:text-4xl">
          You may also like
        </h2>
        <div className="flex gap-2">
          {/* Custom Navigation Arrows if we make this a carousel later */}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col gap-3 rounded-lg bg-[#F9F5F0] p-3 transition-shadow hover:shadow-md"
          >
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Like Button */}
              <button
                type="button"
                className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-gray-600 transition-colors hover:bg-white hover:text-red-500"
              >
                <Heart className="h-5 w-5" />
              </button>

              {/* Discount Tag */}
              {product.discount && (
                <span className="absolute left-2 top-2 rounded bg-[#C47F6B] px-2 py-1 text-xs font-medium text-white">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
              <h3 className="font-sans text-lg font-medium text-[#333333]">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#333333]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button className="w-full rounded-md bg-[#B08D55] font-medium text-white hover:bg-[#9A7B4A]">
              Add to cart
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
