import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ProductGallery } from "./_components/ProductGallery";
import { ProductInfo } from "./_components/ProductInfo";
import { RelatedProducts } from "./_components/RelatedProducts";
import { ReviewsSection } from "./_components/ReviewsSection";

// Dummy Data
const PRODUCT = {
  name: 'Shopper "Amelia"',
  price: 20,
  description:
    "Designed for shopping. Made from high quality and environmentally friendly materials. Easily folds for convenient storage.",
  rating: 5,
  reviewCount: 9,
  colors: ["beige", "olive", "dark-olive", "black"],
  composition: "100% cotton",
  images: [
    "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1288&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=1287&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591369045385-115dd29014a6?q=80&w=1287&auto=format&fit=crop",
  ],
};

const REVIEWS = [
  {
    id: "1",
    name: "Anna",
    date: "05.02.24",
    rating: 5,
    content:
      "Very convenient! I've started using the shopping bag instead of plastic bags - not only am I helping the planet, but I'm also saving space in my bag. I love the design and convenient size!",
  },
  {
    id: "2",
    name: "Max",
    date: "24.01.24",
    rating: 5,
    content:
      "Super practical item! The shopping bag helps me reduce the use of plastic bags and makes my shopping trips enjoyable.",
  },
  {
    id: "3",
    name: "Victoria",
    date: "03.01.24",
    rating: 5,
    content:
      "This is my favorite tote bag! It's incredibly sturdy and lightweight. Thank you for such a convenient accessory! Durable, convenient, and stylish. Highly recommend!",
  },
];

const RELATED_PRODUCTS = [
  {
    id: "1",
    name: "Organic bamboo straws for drinks",
    price: 7,
    image:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Moisturizing jojoba oil for face",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Toothbrushes set for a whole family",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb6dc2e?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Steel thermal drink bottle",
    price: 36,
    originalPrice: 40,
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1602143407151-11115cd4e69b?q=80&w=1287&auto=format&fit=crop",
  },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;

  return (
    <div className="min-h-screen bg-[#F3EFE2] font-sans pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-6 md:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#333333]">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/catalog" className="hover:text-[#333333]">
            Catalog
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#333333] font-medium">{PRODUCT.name}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Gallery */}
          <ProductGallery images={PRODUCT.images} />

          {/* Right: Info */}
          <div className="md:sticky md:top-24 h-fit">
            <ProductInfo product={PRODUCT} />
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 border-t border-[#8F9B6B]/20 pt-16">
          <ReviewsSection reviews={REVIEWS} />
        </div>

        {/* Related Products */}
        <div className="mt-8 border-t border-[#8F9B6B]/20 pt-16 mb-16">
          <RelatedProducts products={RELATED_PRODUCTS} />
        </div>
      </div>
    </div>
  );
}
