import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";

// This component now generates the list of items, not just one card.
export function CategoryItems() {
  const categories = [
    { id: 1, name: "永續生活" },
    { id: 2, name: "環保餐具" },
    { id: 3, name: "天然清潔" },
    { id: 4, name: "有機棉織" },
    { id: 5, name: "綠色植栽" },
    { id: 6, name: "節能家電" },
    { id: 7, name: "太陽能板" },
    { id: 8, name: "環保書籍" },
  ];

  return (
    <>
      {categories.map((category) => (
        <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/4">
          <div className="p-1">
            <Card className="py-0">
              <CardContent className="relative flex aspect-square items-center justify-center p-6">
                <Image
                  src="/banner.jpg"
                  alt={category.name}
                  fill
                  className="rounded-lg object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 rounded-tr-lg rounded-bl-lg bg-primary w-1/2 py-1.5 text-center text-lg font-medium text-white">
                  {category.name}
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </>
  );
}
