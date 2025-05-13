import { Select } from "@/components/ui/Select";
import { CourseCategory, CourseLevel } from "@/types/course";

interface FilterBarProps {
  filters: {
    category: string;
    level: string;
    sortBy: string;
  };
  onFilterChange: (filters: FilterBarProps["filters"]) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleChange = (key: keyof typeof filters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <Select
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="w-full md:w-48"
      >
        <option value="">All Categories</option>
        {Object.values(CourseCategory).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <Select
        value={filters.level}
        onChange={(e) => handleChange("level", e.target.value)}
        className="w-full md:w-48"
      >
        <option value="">All Levels</option>
        {Object.values(CourseLevel).map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </Select>

      <Select
        value={filters.sortBy}
        onChange={(e) => handleChange("sortBy", e.target.value)}
        className="w-full md:w-48"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </Select>
    </div>
  );
} 