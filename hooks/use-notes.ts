import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";
import { api } from "@/api/client";
import type { CreateNoteInput, UpdateNoteInput } from "@/types/api";
import { Note } from "@/types/notes";

export function useNotes(): {
  notes: Note[];
  isLoading: boolean;
  error: Error | null;
  createNote: (note: CreateNoteInput) => void;
  updateNote: (note: UpdateNoteInput) => void;
  deleteNote: (id: string) => void;
} {
  const queryClient = useQueryClient();

  const notesQuery: UseQueryResult<Note[], Error> = useQuery({
    queryKey: ["notes"],
    queryFn: api.notes.list,
  });

  const createNoteMutation: UseMutationResult<Note, Error, CreateNoteInput> =
    useMutation({
      mutationFn: api.notes.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
    });

  const updateNoteMutation: UseMutationResult<Note, Error, UpdateNoteInput> =
    useMutation({
      mutationFn: api.notes.update,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
    });

  const deleteNoteMutation: UseMutationResult<void, Error, string> =
    useMutation({
      mutationFn: api.notes.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
    });

  return {
    notes: notesQuery.data ?? [],
    isLoading: notesQuery.isLoading,
    error: notesQuery.error,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
  };
}
