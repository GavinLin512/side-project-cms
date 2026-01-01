import { CarouselSize } from "@/app/(customer)/_components/carousel";
import { ProductItems } from "@/app/(customer)/_components/carouselItems/productCard";
import SectionTitle from "@/app/(customer)/_components/sectionTitle";

const OnSaleSection = () => {
  const onSaleItems = [
    { id: 1, image: "/banner.jpg", name: "永續生活", price: 100, discount: 10 },
    { id: 2, image: "/banner.jpg", name: "環保餐具", price: 100, discount: 20 },
    { id: 3, image: "/banner.jpg", name: "天然清潔", price: 100, discount: 30 },
    { id: 4, image: "/banner.jpg", name: "有機棉織", price: 100, discount: 40 },
    { id: 5, image: "/banner.jpg", name: "綠色植栽", price: 100, discount: 50 },
    { id: 6, image: "/banner.jpg", name: "節能家電", price: 100, discount: 60 },
    { id: 7, image: "/banner.jpg", name: "太陽能板", price: 100, discount: 70 },
    { id: 8, image: "/banner.jpg", name: "環保書籍", price: 100, discount: 80 },
  ];
  return (
    <>
      <SectionTitle title="On Sale" />
      <CarouselSize>
        <ProductItems products={onSaleItems} tag={"onSale"} />
      </CarouselSize>
    </>
  );
};

export default OnSaleSection;
