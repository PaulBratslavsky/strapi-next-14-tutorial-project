"use server";
import { flattenAttributes } from "@/lib/utils";
import { updateNote } from "@/data/services/update-note";
import { revalidatePath } from "next/cache";

export async function updateNoteAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const id = rawFormData.id as string;

  const dataToUpdate = {
    data: { content: rawFormData.content },
  };

  const data = await updateNote(dataToUpdate, id);
  const flattenedData = flattenAttributes(data);
  revalidatePath("/dashboard/summaries/" + flattenedData.video.id + "/notes/" + id);
  return { data, message: "updateNoteAction" };
}
