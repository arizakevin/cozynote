import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, CATEGORIES_MAP } from "@/lib/constants";
import type { CategoryType } from "@/types/notes";
import { formatDate } from "@/lib/utils";
import CategoryCircle from "@/components/category-circle";
import type React from "react"; // Import React

interface NoteEditPagePresentationProps {
  category: Exclude<CategoryType, "all">;
  title: string;
  content: string;
  lastEdited: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCategoryChange: (newCategory: Exclude<CategoryType, "all">) => void;
  onClose: () => void;
}

export function NoteEditPagePresentation({
  category,
  title,
  content,
  lastEdited,
  onTitleChange,
  onContentChange,
  onCategoryChange,
  onClose,
}: Readonly<NoteEditPagePresentationProps>) {
  const getCategoryStyles = (category: CategoryType) => {
    switch (category) {
      case "random":
        return "bg-coral/50 border-coral";
      case "school":
        return "bg-yellow/50 border-yellow";
      case "personal":
        return "bg-teal/50 border-teal";
      default:
        return "bg-coral/50 border-coral";
    }
  };

  const noteCategories = CATEGORIES.filter((category) => category.id !== "all");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with category selector and close button */}
        <div className="flex justify-between items-center mb-8">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[200px] border-brown">
              <div className="flex items-center gap-2">
                <CategoryCircle color={CATEGORIES_MAP[category].color} />
                <SelectValue>{CATEGORIES_MAP[category].label}</SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-background border-none">
              {noteCategories.map(({ id, label, color }) => (
                <SelectItem key={id} value={id} className="focus:bg-brown/10">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${color}`} />
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-black/5"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Note Container */}
        <div
          className={`rounded-[11px] border-[3px] p-8 transition-colors ${getCategoryStyles(
            category
          )}`}
        >
          <div className="text-right mb-4">
            <span className="text-xs text-black/60">
              Last Edited: {formatDate(lastEdited)}
            </span>
          </div>

          <div className="space-y-6">
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              placeholder="Note Title"
              className="w-full text-[32px] font-display font-bold bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-black/40"
            />
            <textarea
              value={content}
              onChange={onContentChange}
              className="w-full min-h-[calc(100vh-300px)] text-lg bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder:text-black/40"
              placeholder="Pour your heart out..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
