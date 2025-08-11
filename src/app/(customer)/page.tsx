import HeroSection from '@/app/(customer)/_components/heroSection';
import AIShoppingAssistant from '@/features/ai/AIShoppingAssistant';
import CategoriesSection from '@/app/(customer)/_components/categoriesSection';
import PopularProductsSection from '@/app/(customer)/_components/popularProductsSection';
import NewItemsSection from '@/app/(customer)/_components/newItemsSection';
import SubscriptionSection from '@/app/(customer)/_components/subscriptionSection';
import OnSaleSection from '@/app/(customer)/_components/onSaleSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <PopularProductsSection />
      <NewItemsSection />
      <SubscriptionSection />
      <OnSaleSection />
      <AIShoppingAssistant />
    </>
  );
}
