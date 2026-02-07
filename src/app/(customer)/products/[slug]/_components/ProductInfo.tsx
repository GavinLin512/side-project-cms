"use client";

import { Heart, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: {
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    colors: string[];
    composition?: string;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="flex flex-col gap-6 font-sans text-[#333333]">
      {/* Title & Rating */}
      <div className="space-y-2">
        <h1 className="font-serif text-4xl font-normal tracking-wide text-[#333333] md:text-5xl">
          {product.name}
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex text-[#8F9B6B]">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                className={cn(
                  "h-4 w-4",
                  starValue <= Math.round(product.rating)
                    ? "fill-current"
                    : "text-gray-300",
                )}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.reviewCount} reviews
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4 text-sm leading-relaxed text-gray-600">
        <p>{product.description}</p>
        {product.composition && (
          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="font-semibold text-gray-900">Composition:</span>
            <span>{product.composition}</span>
          </div>
        )}
      </div>

      {/* Color Selector */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Color:</Label>
        <RadioGroup
          value={selectedColor}
          onValueChange={setSelectedColor}
          className="flex gap-3"
        >
          {product.colors.map((color) => (
            <div key={color} className="relative">
              <RadioGroupItem
                value={color}
                id={`color-${color}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`color-${color}`}
                className={cn(
                  "block h-8 w-8 cursor-pointer rounded-full border border-gray-200 shadow-sm ring-offset-2 transition-all hover:scale-110 peer-checked:ring-2 peer-checked:ring-[#8F9B6B]",
                  {
                    "bg-[#F3EFE2]": color === "beige",
                    "bg-[#8F9B6B]": color === "olive",
                    "bg-[#7B8668]": color === "dark-olive",
                    "bg-[#333333]": color === "black",
                  },
                )}
                style={{
                  backgroundColor: ![
                    "beige",
                    "olive",
                    "dark-olive",
                    "black",
                  ].includes(color)
                    ? color
                    : undefined,
                }}
              />
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Price & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
        {/* Quantity */}
        <div className="flex h-12 items-center rounded-md border border-gray-300 bg-[#F9F5F0] px-2">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-full w-10 items-center justify-center text-gray-600 hover:text-black"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-lg font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-full w-10 items-center justify-center text-gray-600 hover:text-black"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Price */}
        <div className="text-3xl font-medium tracking-tight">
          ${product.price}
        </div>
      </div>

      <div className="hidden md:flex gap-4 pt-2">
        <Button className="h-14 flex-1 rounded-md bg-[#B08D55] text-lg font-medium text-white shadow-sm hover:bg-[#9A7B4A]">
          Add to cart
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-md border-[#8F9B6B] text-[#8F9B6B] hover:bg-[#F3EFE2] hover:text-[#7B8668]"
        >
          <Heart className="h-6 w-6" />
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Total</span>
          <span className="text-lg font-bold text-[#333333]">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-[#8F9B6B] text-[#8F9B6B]"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button className="h-12 px-8 rounded-full bg-[#B08D55] text-base font-medium text-white hover:bg-[#9A7B4A]">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
