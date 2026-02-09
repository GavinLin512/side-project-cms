"use client";

import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/features/products/types";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products?.length) return null;

  return (
    <section className="py-12">
      <h2 className="mb-8 font-serif text-2xl font-bold text-[#1A1A1A]">
        You might also like
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
