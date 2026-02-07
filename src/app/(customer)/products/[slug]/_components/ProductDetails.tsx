"use client";

import { Leaf, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductDetailsProps {
  product: {
    description: string;
    composition?: string;
  };
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specs">(
    "description",
  );

  const features = [
    {
      icon: Leaf,
      title: "Eco-friendly materials",
      description: "100% sustainable and recyclable materials used.",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free delivery on orders over $100.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Guarantee",
      description: "12-month warranty on all products.",
    },
    {
      icon: RefreshCcw,
      title: "Easy Returns",
      description: "30-day money-back guarantee.",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8E4D3] text-[#8F9B6B]">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#333333]">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 max-w-[200px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex justify-center border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab("description")}
            className={cn(
              "px-8 py-4 text-lg font-medium transition-colors border-b-2",
              activeTab === "description"
                ? "border-[#8F9B6B] text-[#333333]"
                : "border-transparent text-gray-500 hover:text-[#8F9B6B]",
            )}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={cn(
              "px-8 py-4 text-lg font-medium transition-colors border-b-2",
              activeTab === "specs"
                ? "border-[#8F9B6B] text-[#333333]"
                : "border-transparent text-gray-500 hover:text-[#8F9B6B]",
            )}
          >
            Characteristics
          </button>
        </div>

        <div className="min-h-[200px] text-center">
          {activeTab === "description" ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <p className="text-lg leading-relaxed text-gray-700">
                {product.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                Discover the perfect blend of style and sustainability with our
                signature shopper bag. Crafted for the modern eco-conscious
                consumer, it features durable stitching, spacious compartments,
                and a timeless design that complements any outfit. Perfect for
                grocery runs, beach days, or daily commutes.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-lg space-y-4 animate-in fade-in duration-300 text-left">
              <div className="grid grid-cols-2 border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Composition</span>
                <span className="text-gray-600">{product.composition}</span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Dimensions</span>
                <span className="text-gray-600">40cm x 35cm x 15cm</span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Weight</span>
                <span className="text-gray-600">250g</span>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200 py-3">
                <span className="font-medium text-gray-900">Care</span>
                <span className="text-gray-600">Machine wash cold</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
