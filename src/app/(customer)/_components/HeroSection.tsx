import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Gift, Leaf, Medal, Rocket } from 'lucide-react';
import type { HeroCardProps } from '@/customer/_types/type';


const HeroSection = () => {
  const heroCardProps: HeroCardProps[] = [
    { icon: <Leaf size={60} />, description: "Eco friendly goods" },
    { icon: <Gift size={60} />, description: "Eco packaging" },
    { icon: <Rocket size={60} />, description: "Fast delivery" },
    { icon: <Medal size={60} />, description: "Certificated products" },
  ];

  return (
    <>
      {/* Top Text Content */}
      <div className="mb-6 space-y-6 flex flex-col lg:flex-row items-center lg:items-end justify-between w-full">
        <h1 className="w-full sm:w-auto text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif tracking-wider mb-0">
          <span className="block">GREEN CITY STYLE</span>
        </h1>
        <Button size="lg" className="hidden lg:flex mb-2 text-xl px-20 py-6 bg-primary hover:bg-secondary text-primary-foreground">
          Go to catalog
        </Button>
      </div>
      <div className="space-y-6 flex flex-col-reverse xl:flex-row items-center justify-between w-full">
        <div className='flex items-center justify-start sm:w-3/4 lg:w-1/2 xl:w-1/3'>
          <p className="text-lg max-w-md ">
            Welcome to our eco-conscious store, where sustainability meets style! Discover a curated collection of eco friendly products
          </p>
        </div>
        <h1 className="pb-10 w-full sm:w-auto text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif tracking-wider">
          <span className="block">ECO GOODS STORE</span>
        </h1>
      </div>

      {/* Middle Image Content */}
      <div className="relative w-full h-120 mt-8 border-2 rounded-lg">
        <Image
          src="/banner.jpg"
          alt="Eco-friendly products banner"
          fill
          className="rounded-lg object-cover h-1/4"
          priority
        />
      </div>

      {/* Bottom Card Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full my-6">
        {heroCardProps.map((card, index) => (
          <Card key={index}>
            <CardHeader className='py-10'>
              <CardTitle className='flex items-center justify-center'>
                {card.icon}
              </CardTitle>
              <CardDescription className='text-center text-2xl font-bold'>
                {card.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};

export default HeroSection;
