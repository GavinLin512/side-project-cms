import { Heart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  badges?: { text: string; color?: string }[];
  isWide?: boolean;
}

export function ProductCard({
  image,
  title,
  price,
  oldPrice,
  badges = [],
  isWide = false,
}: ProductCardProps) {
  return (
    <div
      className={`flex flex-col gap-3 group ${isWide ? "col-span-1 md:col-span-2" : "col-span-1"}`}
    >
      <div
        className={`relative rounded-lg overflow-hidden bg-[#F4F4F4] w-full ${isWide ? "aspect-[16/9] md:aspect-[2/1]" : "aspect-[4/5]"}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            isWide
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {badges.map((badge) => (
            <span
              key={badge.text}
              className={`text-white text-xs px-2 py-1 rounded-sm uppercase tracking-wide font-medium ${badge.text === "-10%" ? "bg-[#D97757]" : "bg-[#7A8760]"}`}
            >
              {badge.text}
            </span>
          ))}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors z-10"
        >
          <Heart size={18} className="text-[#1A1A1A]" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-[#7A8760] transition-colors leading-tight">
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl text-[#1A1A1A]">${price}</span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-lg font-medium">
              ${oldPrice}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-[#C49A46] text-white py-3 rounded-md font-medium hover:bg-[#B0893C] transition-colors mt-auto cursor-pointer"
      >
        Add to cart
      </button>
    </div>
  );
}
