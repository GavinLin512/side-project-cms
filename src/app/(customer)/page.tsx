import CategoriesSection from "@/app/(customer)/_components/categoriesSection";
import HeroSection from "@/app/(customer)/_components/heroSection";
import NewItemsSection from "@/app/(customer)/_components/newItemsSection";
import OnSaleSection from "@/app/(customer)/_components/onSaleSection";
import PopularProductsSection from "@/app/(customer)/_components/popularProductsSection";
import SubscriptionSection from "@/app/(customer)/_components/subscriptionSection";
import AIShoppingAssistant from "@/features/ai/AIShoppingAssistant";

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
