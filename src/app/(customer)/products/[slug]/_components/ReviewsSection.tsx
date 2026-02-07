"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  content: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [rating, setRating] = useState(0);

  return (
    <section className="space-y-8 py-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-serif text-3xl font-normal text-[#333333] md:text-4xl">
          Reviews about the product
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="flex h-full flex-col justify-between rounded-xl bg-[#F9F5F0] p-6 shadow-sm transition-all hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#333333]">
                      {review.name}
                    </span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex text-[#8F9B6B]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-3.5 w-3.5",
                          star <= review.rating
                            ? "fill-current"
                            : "text-gray-300",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    "{review.content}"
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex items-center justify-end gap-2">
          <CarouselPrevious className="static translate-y-0 hover:bg-[#F3EFE2] hover:text-[#7B8668]" />
          <CarouselNext className="static translate-y-0 hover:bg-[#F3EFE2] hover:text-[#7B8668]" />
        </div>
      </Carousel>

      <div className="flex justify-end pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-12 w-full border-[#B08D55] text-[#B08D55] hover:bg-[#F3EFE2] hover:text-[#9A7B4A] md:w-auto md:px-8"
            >
              Leave feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-[#F9F5F0] p-6 sm:max-w-lg">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-center font-serif text-2xl font-normal text-[#333333]">
                Your opinion is important to us
              </DialogTitle>
            </DialogHeader>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">First name</Label>
                <Input
                  id="name"
                  placeholder="First name"
                  className="bg-transparent border-gray-300 focus-visible:ring-[#8F9B6B]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="bg-transparent border-gray-300 focus-visible:ring-[#8F9B6B]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-0.5 text-[#8F9B6B] focus:outline-none"
                      >
                        <Star
                          className={cn(
                            "h-4 w-4",
                            star <= rating ? "fill-current" : "text-gray-300",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium underline underline-offset-4 hover:text-[#8F9B6B]"
                >
                  Add photo
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Your feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Your feedback"
                  className="min-h-[120px] bg-transparent border-gray-300 focus-visible:ring-[#8F9B6B]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#7B8668] text-white hover:bg-[#6A7558]"
              >
                Send
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
