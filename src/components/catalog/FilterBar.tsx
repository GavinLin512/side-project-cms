import { ChevronDown } from "lucide-react";

export function FilterBar() {
  return (
    <div className="flex justify-between items-center py-6 w-full">
      <button
        type="button"
        className="flex items-center gap-2 font-bold text-lg text-[#1A1A1A] hover:text-[#7A8760] transition-colors"
      >
        Filter <ChevronDown size={20} />
      </button>

      <button
        type="button"
        className="flex items-center gap-2 font-bold text-lg text-[#1A1A1A] hover:text-[#7A8760] transition-colors"
      >
        Sort by <ChevronDown size={20} />
      </button>
    </div>
  );
}
