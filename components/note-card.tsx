"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { capitalize, formatDate } from "@/lib/utils";
import { Note } from "@/types/notes";

// If you haven't installed these yet:
// npm install react-markdown remark-gfm
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const getCategoryStyles = (category: string) => {
  const baseStyles =
    "block w-[303px] h-[246px] rounded-[11px] p-4 transition-all duration-300 cursor-pointer border-[3px] shadow-[1px_1px_2px_rgba(0,0,0,0.25)] overflow-hidden";
  switch (category) {
    case "random":
      return `${baseStyles} bg-coral/50 border-coral`;
    case "school":
      return `${baseStyles} bg-yellow/50 border-yellow`;
    case "personal":
      return `${baseStyles} bg-teal/50 border-teal`;
    default:
      return `${baseStyles} bg-coral/50 border-coral`;
  }
};

export interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onDelete }: Readonly<NoteCardProps>) {
  return (
    <Link
      href={`/notes/${note.id}`}
      className={`group relative ${getCategoryStyles(
        note.category
      )} flex flex-col`}
    >
      {/* Delete (Trash) Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(note.id);
        }}
        aria-label="Delete note"
        className="absolute right-3 top-3 h-8 w-8 text-brown/20 hover:text-brown/60 hover:bg-transparent 
                   opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {/* Date + Category */}
      <div className="flex-shrink-0 mb-3 text-brown/60">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-black">
            {formatDate(note.createdAt)}
          </span>
          <span className="text-xs text-black capitalize">
            {note.category === "random"
              ? "Random Thoughts"
              : capitalize(note.category)}
          </span>
        </div>
      </div>

      {/* 
        Title: 
        - Up to ~5 lines, so it can be “long” but won’t fully hide content.
        - line-clamp with ellipsis if it overflows that limit.
      */}
      <h3
        className="
          font-display font-bold text-2xl text-black leading-tight mb-2
          overflow-hidden text-ellipsis
          line-clamp-5   /* Adjust as needed to allow more or fewer lines */
        "
      >
        {note.title || "Note Title"}
      </h3>

      {/* 
        Content: 
        - Renders markdown (lists, line breaks, etc.).
        - Can expand if title is short, but eventually gets ellipsed too.
        - line-clamp-4 is common for a quick preview. Tweak as you like.
      */}
      <div className="relative flex-1 overflow-hidden">
        <ReactMarkdown
          className="
            prose prose-sm text-black max-w-none
            whitespace-pre-wrap break-words 
            overflow-hidden text-ellipsis
            line-clamp-4  /* You can increase or decrease as desired */
          "
          remarkPlugins={[remarkGfm]}
        >
          {note.content || ""}
        </ReactMarkdown>
      </div>
    </Link>
  );
}
