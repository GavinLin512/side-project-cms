import HeroSection from '@/app/(customer)/_components/heroSection';
import AIShoppingAssistant from '@/features/ai/AIShoppingAssistant';
import CategoriesSection from '@/app/(customer)/_components/categoriesSection';
import PopularProductsSection from '@/app/(customer)/_components/popularProductsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <PopularProductsSection />
      <AIShoppingAssistant />
    </>
  );
}
