import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import SectionContainer from "@/app/(customer)/_components/sectionContainer";

export default function SubscriptionSection() {
  return (
    <SectionContainer>
      <div className="bg-primary py-14 px-8 md:px-24 rounded-lg text-white flex flex-col gap-8 w-full">
        {/* Top Row: Titles */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <h1 className="text-5xl md:text-8xl font-serif">YOUR FIRST PURCHASE</h1>
        </div>


        {/* Bottom Row: Content */}
        <div className="flex flex-col md:flex-row md:justify-end justify-between items-center gap-8">
          <div className="flex items-start gap-16">
            <Leaf size={64} className="hidden lg:block" />
            <div className="flex flex-col gap-8">
              <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-4">
                <p className="max-w-xs text-xl md:text-2xl">
                  Subscribe to our newsletter and get discount on your first
                  purchase
                </p>
                <h2 className="flex flex-wrap items-center  gap-4 text-5xl md:text-8xl font-serif md:text-right">
                  WITH <span className="text-secondary">10%</span> OFF
                  <Leaf className="lg:hidden lg:w-16 lg:h-16 w-8 h-8" />
                </h2>
              </div>
              <div>
                <form className="flex gap-4 w-full md:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your e-mail"
                    className="bg-white/20 border-white/50 placeholder:text-white/80 rounded-lg w-full md:w-1/2"
                  />
                  <Button
                    variant="secondary"
                    className="text-white rounded-lg flex-shrink-0"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
