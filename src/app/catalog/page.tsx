"use client";

import { ProductItems } from "@/app/(customer)/_components/carouselItems/productCard";
import { FilterBar } from "@/components/catalog/FilterBar";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

export default function CatalogPage() {
  const products = [
    {
      id: 1,
      image: "/images/product-1.jpg",
      name: "Eco shopper, 100% cotton",
      price: 18,
      discount: 0,
    },
    {
      id: 2,
      image: "/images/product-2.jpg",
      name: "Wheat dishes set for a picnic",
      price: 27,
      discount: 10,
    },
    {
      id: 3,
      image: "/images/product-3.jpg",
      name: "Shower care set",
      price: 34,
      discount: 0,
    },
    {
      id: 4,
      image: "/images/product-4.jpg",
      name: "Moisturizing jojoba oil for face",
      price: 16,
      discount: 0,
    },
    {
      id: 5,
      image: "/images/product-5.jpg",
      name: "Organic plant straws",
      price: 10,
      discount: 0,
    },
    {
      id: 6,
      image: "/images/product-6.jpg",
      name: "Solid shampoo and hair conditioner",
      price: 22,
      discount: 0,
    },
    {
      id: 7,
      image: "/images/product-7.jpg",
      name: "Soap and body scrub with olive oil",
      price: 12,
      discount: 0,
    },
    {
      id: 8,
      image: "/images/product-8.jpg",
      name: "Handmade cotton shopper",
      price: 18,
      discount: 0,
    },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterBar />

        <Carousel>
          <CarouselContent className="grid grid-cols-2 md:grid-cols-4 gap-6 ml-0 block [&_[role=group]]:!basis-auto [&_[role=group]]:!w-auto [&_[role=group]]:!min-w-0">
            <ProductItems products={products} tag="new" />
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
