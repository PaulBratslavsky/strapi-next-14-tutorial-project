import RenderList from "@/components/custom/RenderList";
import { NoteCardLink } from "@/components/custom/NoteCardLink";
import { getNotes } from "@/loaders";

export default async function NotesRoute({ params }: { readonly params: any }) {
  const { data } = await getNotes(params.videoId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <RenderList data={data} component={NoteCardLink} />
    </div>
  );
}
