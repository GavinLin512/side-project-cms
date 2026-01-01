import { CarouselSize } from "@/app/(customer)/_components/carousel";
import { ProductItems } from "@/app/(customer)/_components/carouselItems/productCard";
import SectionTitle from "@/app/(customer)/_components/sectionTitle";

const PopularProductsSection = () => {
  const popularProducts = [
    { id: 1, image: "/banner.jpg", name: "永續生活", price: 100 },
    { id: 2, image: "/banner.jpg", name: "環保餐具", price: 100 },
    { id: 3, image: "/banner.jpg", name: "天然清潔", price: 100 },
    { id: 4, image: "/banner.jpg", name: "有機棉織", price: 100 },
    { id: 5, image: "/banner.jpg", name: "綠色植栽", price: 100 },
    { id: 6, image: "/banner.jpg", name: "節能家電", price: 100 },
    { id: 7, image: "/banner.jpg", name: "太陽能板", price: 100 },
    { id: 8, image: "/banner.jpg", name: "環保書籍", price: 100 },
  ];
  return (
    <>
      <SectionTitle title="Popular Products" />
      <CarouselSize>
        <ProductItems products={popularProducts} tag={"popular"} />
      </CarouselSize>
    </>
  );
};

export default PopularProductsSection;
