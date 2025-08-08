import HeroSection from '@/app/(customer)/_components/heroSection';
import AIShoppingAssistant from '@/features/ai/AIShoppingAssistant';
import CategoriesSection from './_components/categoriesSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <AIShoppingAssistant />
    </>
  );
}
