import supabase from "@/lib/supabase";
import { CreateNoteInput, UpdateNoteInput } from "@/types/api";
import { Note } from "@/types/notes";
import { v4 as uuidv4 } from "uuid";

// Simulated delay to mimic network latency
const SIMULATED_DELAY_MS = 200;

// In-memory database
const notesDb = new Map<string, Note>();

const simulateDelay = () =>
  new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

const getAuthenticatedUser = async (): Promise<{
  id: string;
  accessToken: string;
}> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    throw new Error("Failed to retrieve session. User not logged in.");
  }

  return { id: session.user.id, accessToken: session.access_token };
};

export const api = {
  notes: {
    list: async (): Promise<Note[]> => {
      const { id: userId } = await getAuthenticatedUser();
      await simulateDelay();
      return Array.from(notesDb.values()).filter(
        (note) => note.userId === userId
      );
    },

    create: async (input: CreateNoteInput): Promise<Note> => {
      const { id: userId } = await getAuthenticatedUser();
      await simulateDelay();
      const newNote: Note = {
        id: uuidv4(),
        ...input,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      notesDb.set(newNote.id, newNote);
      return newNote;
    },

    update: async (input: UpdateNoteInput): Promise<Note> => {
      const { id: userId } = await getAuthenticatedUser();
      await simulateDelay();
      const existingNote = notesDb.get(input.id);
      if (!existingNote || existingNote.userId !== userId) {
        throw new Error("Note not found or unauthorized");
      }
      const updatedNote: Note = {
        ...existingNote,
        ...input,
        updatedAt: new Date().toISOString(),
      };
      notesDb.set(input.id, updatedNote);
      return updatedNote;
    },

    delete: async (id: string): Promise<void> => {
      const { id: userId } = await getAuthenticatedUser();
      await simulateDelay();
      const existingNote = notesDb.get(id);
      if (!existingNote || existingNote.userId !== userId) {
        throw new Error("Note not found or unauthorized");
      }
      notesDb.delete(id);
    },
  },
};
