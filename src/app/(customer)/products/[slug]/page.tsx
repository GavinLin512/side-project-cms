import { notFound } from "next/navigation";
import { products } from "@/features/products/data/mock-products";
import { ProductGallery } from "./_components/ProductGallery";
import { ProductInfo } from "./_components/ProductInfo";
import { RelatedProducts } from "./_components/RelatedProducts";
import { ReviewsSection } from "./_components/ReviewsSection";

// Mock function to get product by ID (slug is ID for now)
async function getProduct(slug: string) {
  return products.find((p) => p.id === slug);
}

// Mock related products
async function getRelatedProducts(currentId: string) {
  return products.filter((p) => p.id !== currentId).slice(0, 4);
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);

  // Mock extended data
  const extendedProduct = {
    ...product,
    images: [product.image, product.image, product.image],
    description:
      "Experience sustainable living with this eco-friendly product. Crafted from natural materials, it helps reduce waste while adding style to your home.",
    reviews: [
      {
        id: "1",
        author: "Sarah M.",
        rating: 5,
        content: "Absolutely love this! Great quality and looks amazing.",
        date: "2023-10-15",
      },
      {
        id: "2",
        author: "Mike T.",
        rating: 4,
        content: "Good value for money. Highly recommend.",
        date: "2023-10-10",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery
          images={extendedProduct.images}
          title={extendedProduct.title}
        />
        <ProductInfo product={extendedProduct} />
      </div>

      <div className="mt-16">
        <ReviewsSection reviews={extendedProduct.reviews} />
      </div>

      <div className="mt-16 border-t border-gray-100 pt-16">
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
