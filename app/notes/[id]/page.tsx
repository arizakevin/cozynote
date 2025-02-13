"use client";

import { useParams, useRouter } from "next/navigation";
import { useNotes } from "@/hooks/use-notes";
import { NoteEditPagePresentation } from "./presentation";
import { useEffect, useState } from "react";
import type { CategoryType, Note } from "@/types/notes";
import { useDebouncedCallback } from "use-debounce";
import type React from "react"; // Added import for React

export default function NoteEditPage() {
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
    // Immediately flush any pending updates
    debouncedUpdate.flush();

    setCategory(newCategory);
    // Immediate update for category changes to prevent visual glitches
    updateNote({
      id: currentNote!.id,
      category: newCategory,
    });
    setLastEdited(new Date().toISOString());
  };

  const handleClose = () => {
    // Immediately flush any pending updates
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
  };

  if (!currentNote) {
    return null; // or a loading state
  }

  return (
    <NoteEditPagePresentation
      category={category}
      title={title}
      content={content}
      lastEdited={lastEdited}
      onTitleChange={handleTitleChange}
      onContentChange={handleContentChange}
      onCategoryChange={handleCategoryChange}
      onClose={handleClose}
    />
  );
}
