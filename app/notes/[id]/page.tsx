"use client";

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
import { useEffect, useState } from "react";
import type { CategoryType, Note } from "@/types/notes";
import { useParams, useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { useNotes } from "@/hooks/use-notes";
import { useDebouncedCallback } from "use-debounce";
import type React from "react"; // Added import for React

export default function NotePage() {
  const { id } = useParams();
  const router = useRouter();
  const { notes, updateNote } = useNotes();

  // Find the note from the notes list
  const currentNote = notes.find((note) => note.id === id);

  // State management
  const [category, setCategory] = useState<Exclude<CategoryType, "all">>(
    currentNote?.category ?? "random"
  );
  const [title, setTitle] = useState(currentNote?.title ?? "");
  const [content, setContent] = useState(currentNote?.content ?? "");
  const [lastEdited, setLastEdited] = useState(
    currentNote?.updatedAt ?? new Date().toISOString()
  );

  // Update local state when note is loaded
  useEffect(() => {
    if (currentNote) {
      setCategory(currentNote.category);
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setLastEdited(currentNote.updatedAt);
    }
  }, [currentNote]);

  // If note is not found, redirect to notes page
  useEffect(() => {
    if (notes.length > 0 && !currentNote) {
      router.push("/notes");
    }
  }, [notes, currentNote, router]);

  // Debounced save function
  const debouncedUpdate = useDebouncedCallback((updates: Partial<Note>) => {
    if (!currentNote) return;

    updateNote({
      id: currentNote.id,
      ...updates,
    });

    setLastEdited(new Date().toISOString());
  }, 1000);

  // Update handlers
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedUpdate({ title: newTitle });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    debouncedUpdate({ content: newContent });
  };

  const handleCategoryChange = (newCategory: Exclude<CategoryType, "all">) => {
    setCategory(newCategory);
    // Immediate update for category changes to prevent visual glitches
    updateNote({
      id: currentNote!.id,
      category: newCategory,
    });
    setLastEdited(new Date().toISOString());
  };

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

  if (!currentNote) {
    return null; // or a loading state
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with category selector and close button */}
        <div className="flex justify-between items-center mb-8">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[200px] border-brown">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full bg-${CATEGORIES_MAP[category].color}`}
                />
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
            onClick={() => {
              // Cancel any pending debounced updates
              debouncedUpdate.flush();

              // Save current state immediately if there are changes
              if (
                currentNote &&
                (title !== currentNote.title ||
                  content !== currentNote.content ||
                  category !== currentNote.category)
              ) {
                updateNote({
                  id: currentNote.id,
                  title,
                  content,
                  category,
                });
              }

              // Navigate away
              router.push("/notes");
            }}
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
              onChange={handleTitleChange}
              placeholder="Note Title"
              className="w-full text-[32px] font-display font-bold bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-black/40"
            />
            <textarea
              value={content}
              onChange={handleContentChange}
              className="w-full min-h-[calc(100vh-300px)] text-lg bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder:text-black/40"
              placeholder="Pour your heart out..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
