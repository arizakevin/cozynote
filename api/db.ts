import { Note } from "@/types/notes";

class InMemoryDB {
  private notes: Note[] = [];

  async findNotes(userId: string): Promise<Note[]> {
    return this.notes.filter((note) => note.userId === userId);
  }

  async findNoteById(id: string, userId: string): Promise<Note | undefined> {
    return this.notes.find((note) => note.id === id && note.userId === userId);
  }

  async createNote(note: Note): Promise<Note> {
    this.notes.push(note);
    return note;
  }

  async updateNote(
    id: string,
    userId: string,
    update: Partial<Note>
  ): Promise<Note | undefined> {
    const index = this.notes.findIndex(
      (note) => note.id === id && note.userId === userId
    );
    if (index === -1) return undefined;

    this.notes[index] = { ...this.notes[index], ...update };
    return this.notes[index];
  }

  async deleteNote(id: string, userId: string): Promise<boolean> {
    const initialLength = this.notes.length;
    this.notes = this.notes.filter(
      (note) => !(note.id === id && note.userId === userId)
    );
    return initialLength > this.notes.length;
  }
}

export const db = new InMemoryDB();
