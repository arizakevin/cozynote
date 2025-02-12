import { Note } from "./notes";

export type CreateNoteInput = Omit<
  Note,
  "id" | "createdAt" | "updatedAt" | "userId"
>;
export type UpdateNoteInput = Partial<CreateNoteInput> & { id: string };
