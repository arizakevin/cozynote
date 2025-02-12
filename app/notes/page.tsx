"use client";

import { useNotes } from "@/hooks/use-notes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NotesPresentation } from "./presentation";
import { useSupabase } from "@/providers/supabase-provider";

export default function NotesPage() {
  const { supabase } = useSupabase();
  const session = supabase.auth.getSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { notes, isLoading, error, createNote, deleteNote } = useNotes();

  useEffect(() => {
    if (session === null) {
      router.push("/login");
    }
  }, [session, router]);

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during sign out:", error.message);
        return;
      }
      router.push("/login");
    } catch (err) {
      console.error("Unexpected error during sign out:", err);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <NotesPresentation
      notes={notes}
      isLoading={isLoading}
      error={error}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      onCreateNote={createNote}
      onDeleteNote={deleteNote}
      onLogout={handleLogout}
      isSigningOut={isSigningOut}
    />
  );
}
