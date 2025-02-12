import { CategoryColor } from "@/types/notes";

interface CategoryCircleProps {
  color: CategoryColor;
}

const CategoryCircle: React.FC<CategoryCircleProps> = ({ color }) => {
  // Use a switch statement with explicit Tailwind classes here, rather than dynamically constructing `bg-<color>`.
  // This ensures that Tailwind includes these background color classes in the final CSS build.
  switch (color) {
    case "coral":
      return <div className="w-2 h-2 rounded-full bg-coral mr-2" />;
    case "yellow":
      return <div className="w-2 h-2 rounded-full bg-yellow mr-2" />;
    case "teal":
      return <div className="w-2 h-2 rounded-full bg-teal mr-2" />;
    default:
      return null;
  }
};

export default CategoryCircle;
