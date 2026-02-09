"use client";

import { Star } from "lucide-react";
import type { Review } from "@/features/products/types";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews?.length) return null;

  return (
    <section className="py-12 border-t border-gray-100">
      <h2 className="mb-8 font-serif text-2xl font-bold text-[#1A1A1A]">
        Customer Reviews
      </h2>
      <div className="space-y-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-8 last:border-0"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-[#1A1A1A]">{review.author}</h4>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={`star-${i}`} // Stable key for static stars
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-[#BA9659] text-[#BA9659]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">{review.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
