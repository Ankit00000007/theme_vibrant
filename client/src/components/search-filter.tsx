import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFilterProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
}

export function SearchFilter({ onSearchChange, onCategoryChange, categories }: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 h-4 w-4" />
        <Input
          placeholder="Search products..."
          className="pl-10 bg-white/70 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 placeholder-gray-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Select onValueChange={(value) => onCategoryChange(value || null)}>
        <SelectTrigger className="w-full sm:w-[200px] bg-white/70 border-emerald-200 focus:ring-emerald-400 focus:border-emerald-400 text-gray-700">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 border-emerald-200">
          <SelectItem value="all" className="text-gray-700 focus:bg-emerald-50">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem 
              key={category} 
              value={category}
              className="text-gray-700 focus:bg-emerald-50"
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}