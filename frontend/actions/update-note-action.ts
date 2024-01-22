"use server";
import { updateNote } from "@/services/update-note";
import { revalidatePath } from "next/cache";

export async function updateNoteAction( formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const id = rawFormData.id as string;

  console.log(id, rawFormData, "updateNoteAction")
  const dataToUpdate = {
    data: {
      content: rawFormData.content,
    }
  };
  const data = await updateNote(dataToUpdate, id);
  revalidatePath("/");
  return { data, message: "updateNoteAction" };
}
