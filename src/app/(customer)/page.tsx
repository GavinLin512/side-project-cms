import Header from '@/customer/_components/layouts/Header';
import HeroSection from '@/customer/_components/HeroSection';
import AIShoppingAssistant from '@/features/ai/AIShoppingAssistant';

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <HeroSection />
      </main>
      <AIShoppingAssistant />
    </div>
  );
}
