"use server";
import { flattenAttributes } from "@/lib/utils";
import { deleteNote } from "@/services/delete-note";
import { redirect } from "next/navigation";

export async function deleteNoteAction(id: string) {
  const data = await deleteNote(id);
  const flattenedData = flattenAttributes(data);
  redirect("/dashboard/summaries/" + flattenedData.video.id + "/notes");
}
