import { CarouselSize } from "@/app/(customer)/_components/carousel";
import { CategoryItems } from "@/app/(customer)/_components/carouselItems/categoryCard";
import SectionTitle from "@/app/(customer)/_components/sectionTitle";

const CategoriesSection = () => {
  return (
    <>
      <SectionTitle title="Categories" />
      <CarouselSize>
        <CategoryItems />
      </CarouselSize>
    </>
  );
};

export default CategoriesSection;
