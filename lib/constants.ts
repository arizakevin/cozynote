import { Categories, CategoryType } from "@/types/notes";

export const CATEGORIES: Categories[] = [
  { id: "all", label: "All Categories", color: null },
  { id: "random", label: "Random Thoughts", color: "coral" },
  { id: "school", label: "School", color: "yellow" },
  { id: "personal", label: "Personal", color: "teal" },
];

export const CATEGORIES_MAP = CATEGORIES.reduce((acc, category) => {
  acc[category.id] = category;
  return acc;
}, {} as Record<CategoryType, Categories>);
