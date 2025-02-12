export type CategoryType = "all" | "random" | "school" | "personal";
export type CategoryLabel =
  | "All Categories"
  | "Random Thoughts"
  | "School"
  | "Personal";
export type CategoryColor = "coral" | "yellow" | "teal" | null;

export type Categories = {
  id: CategoryType;
  label: CategoryLabel;
  color: CategoryColor;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  category: Exclude<CategoryType, "all">;
  createdAt: string;
  updatedAt: string;
  userId: string;
};
