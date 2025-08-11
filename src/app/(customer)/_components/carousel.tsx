"use client"

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import React from "react"

export function CarouselSize({ children }: { children: React.ReactNode }) {
  const iconPrev = <ChevronLeft />
  const iconNext = <ChevronRight />
  // 使用 Autoplay 需要 use client
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>{children}</CarouselContent>
      <div className="absolute top-[-2.5rem] right-1 z-10 flex gap-x-2">
        <CarouselPrevious className="static rounded-md" icon={iconPrev} />
        <CarouselNext className="static rounded-md" icon={iconNext} />
      </div>
    </Carousel>
  )
}
