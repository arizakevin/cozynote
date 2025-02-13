import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NoteCard } from "@/components/note-card";
import type { CreateNoteInput } from "@/types/api";
import { LogOut, Plus } from "lucide-react";
import { CategoryType, Note } from "@/types/notes";
import { CATEGORIES } from "@/lib/constants";
import CategoryCircle from "@/components/category-circle";

interface NotesPagePresentationProps {
  notes: Note[];
  isLoading: boolean;
  error: Error | null;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onCreateNote: (note: CreateNoteInput) => void;
  onDeleteNote: (id: string) => void;
  onLogout: () => void;
  isSigningOut: boolean;
}

export function NotesPagePresentation({
  notes,
  selectedCategory,
  onCategoryChange,
  onCreateNote,
  onDeleteNote,
  onLogout,
  isSigningOut,
}: Readonly<NotesPagePresentationProps>) {
  const filteredNotes =
    selectedCategory === "all"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

  const notesOnCategoryCountMap: {
    [key in CategoryType]: number;
  } = {
    all: notes.length,
    random: notes.filter((note) => note.category === "random").length,
    school: notes.filter((note) => note.category === "school").length,
    personal: notes.filter((note) => note.category === "personal").length,
  };

  return (
    <div className="container mx-auto py-8">
      {/* New Note button floating above everything */}
      <div className="w-full flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() =>
            onCreateNote({ title: "", content: "", category: "random" })
          }
          className="text-brown border-brown rounded-full hover:text-brown hover:bg-brown/5 h-[43px] font-bold text-base"
        >
          <Plus className="h-4 w-4" /> New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        {/* Categories sidebar */}
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <button
              id={category.id}
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className="w-full text-left text-black text-xs px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-brown/5 transition-colors"
            >
              <div className="w-full flex items-center">
                <CategoryCircle color={category.color} />
                <div className={category.id === "all" ? "font-bold" : ""}>
                  {category.label}
                </div>
                {category.id !== "all" &&
                notesOnCategoryCountMap[category.id] > 0 ? (
                  <div className="ml-auto">
                    {`${notesOnCategoryCountMap[category.id]}`}
                  </div>
                ) : null}
              </div>
            </button>
          ))}
          <div className="h-5" />
          <Button
            disabled={isSigningOut}
            onClick={onLogout}
            variant="link"
            className="text-black px-4 opacity-30 hover:opacity-100 hover:no-underline"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Notes grid */}
        <div>
          {filteredNotes.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={() => onDeleteNote(note.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Image
                src="/cozy-coffe-cup-illustration.png"
                alt="Empty notes illustration"
                width={297}
                height={296}
                className="mx-auto mb-4"
              />
              <p className="text-brown text-lg">
                I&apos;m just here waiting for your charming notes...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
