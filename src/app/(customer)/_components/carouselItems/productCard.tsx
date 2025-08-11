"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CarouselItem } from "@/components/ui/carousel"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import type { productItemsProps } from "@/app/(customer)/_types/type"

// This component now generates the list of items, not just one card.
export function ProductItems({ products, tag }: { products: productItemsProps[], tag: "new" | "popular" | "onSale" | undefined }) {
  const [likedItems, setLikedItems] = useState(new Set<number>())

  const toggleLike = (productId: number) => {
    setLikedItems((prev) => {
      const newLikedItems = new Set(prev)
      if (newLikedItems.has(productId)) {
        newLikedItems.delete(productId)
      } else {
        newLikedItems.add(productId)
      }
      return newLikedItems
    })
  }



  return (
    <>
      {products.map((product) => {
        const isLiked = likedItems.has(product.id)
        const discountedPrice = Math.round(product.price * (1 - (product.discount ?? 0) / 100)).toFixed(0)
        return (
          <CarouselItem
            key={product.id}
            className="md:basis-1/2 lg:basis-1/4"
          >
            <div className="p-1">
              <Card className="py-0">
                <CardContent className="relative flex aspect-square items-center justify-center p-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="rounded-lg object-cover"
                    priority
                  />
                  <Button
                    variant="ghost"
                    onClick={() => toggleLike(product.id)}
                    className="group absolute top-2 right-2 h-10 w-10 p-0 rounded-full bg-white text-center font-medium text-primary transition-colors hover:bg-background cursor-pointer"
                  >
                    <Heart
                      className={`h-8 w-8 transition-colors ${isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-primary group-hover:fill-red-500 group-hover:text-red-500"
                        }`}
                      strokeWidth={3}
                    />
                  </Button>
                  {tag === "new" && (
                    <div className="absolute top-0 left-0 rounded-tl-lg rounded-br-lg bg-primary w-1/3 py-1.5 text-center text-lg font-medium text-white">
                      New
                    </div>
                  )}
                  {tag === "onSale" && (
                    <div className="absolute top-0 left-6 rounded-b-lg bg-red-800 px-2 py-6 text-center text-lg font-medium text-white">
                      -{product.discount}%
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="flex flex-col items-start">
                <div className="text-2xl font-medium mt-2">{product.name}</div>
                <div className="flex items-center gap-2">
                  {tag === "onSale" && product.discount && (
                    <p className="text-3xl text-red-800 font-bold">
                      $ {discountedPrice}
                    </p>
                  )}
                  <p className={`text-3xl text-primary font-bold ${tag === "onSale" && "line-through opacity-50"}`}>
                    $ {product.price}
                  </p>
                </div>
              </div>
              <Button variant="secondary" className="text-lg w-full mt-2 cursor-pointer">
                Add to Cart
              </Button>
            </div>
          </CarouselItem>
        )
      })}
    </>
  )
}
