"use client";

import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming shadcn button exists
import type { Product } from "@/features/products/types";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-2">
        {product.badges?.map((badge) => (
          <span
            key={badge}
            className="inline-block rounded-sm bg-[#838A60] px-2 py-1 text-xs font-medium text-white mr-2"
          >
            {badge}
          </span>
        ))}
        <h1 className="font-sans text-3xl font-bold text-[#1A1A1A]">
          {product.title}
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl font-semibold text-[#1A1A1A]">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="font-serif text-lg text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-stone max-w-none text-gray-600">
        <p>{product.description || "No description available."}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Quantity */}
        <div className="flex items-center rounded-md border border-gray-200">
          <button
            type="button"
            onClick={decrement}
            className="p-3 hover:bg-gray-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={increment}
            className="p-3 hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart */}
        <Button className="flex-1 bg-[#BA9659] hover:bg-[#A6854D] h-12 text-base">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to cart
        </Button>

        {/* Wishlist */}
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 text-gray-700 hover:text-red-500 transition-colors"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Metadata */}
      <div className="border-t border-gray-100 pt-6 text-sm text-gray-500">
        <p>
          Category:{" "}
          <span className="text-[#1A1A1A]">
            {product.category || "General"}
          </span>
        </p>
        <p>SKU: {product.id}</p>
      </div>
    </div>
  );
}
