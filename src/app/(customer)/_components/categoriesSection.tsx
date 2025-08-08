import { CarouselSize } from "@/app/(customer)/_components/carousel"
import SectionContainer from "@/app/(customer)/_components/sectionContainer"
import { CategoryItems } from "@/app/(customer)/_components/carouselItems/categoryCard"
import SectionTitle from "@/app/(customer)/_components/sectionTitle"

const CategoriesSection = () => {
  return (
    <SectionContainer>
      <SectionTitle title="Categories" />
      <CarouselSize>
        <CategoryItems />
      </CarouselSize>
    </SectionContainer>
  )
}

export default CategoriesSection


