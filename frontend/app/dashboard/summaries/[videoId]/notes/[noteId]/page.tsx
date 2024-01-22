import { NoteCard } from "@/components/custom/NoteCard";
import { getNoteById } from "@/loaders";

interface ParamsProps {
  params: {
    noteId: string;
  };
}

export default async function NoteRoute({ params }: ParamsProps) {
  const data = await getNoteById(params.noteId);
  if (!data) return <p>No Items Found</p>;
  return <NoteCard item={data} />;
}
