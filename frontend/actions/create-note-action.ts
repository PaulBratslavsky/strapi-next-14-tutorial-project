"use server";
import { flattenAttributes } from "@/lib/utils";
import { createNote } from "@/services/create-note";
import { revalidatePath } from "next/cache";

export async function createNoteAction(prevState: any, formData: FormData) {
  console.log(prevState)
  const rawFormData = Object.fromEntries(formData);
  console.log(rawFormData)
  const videoId = rawFormData.videoId;
  const dataToSave = {
    data: {
      video: rawFormData.videoId,
      title: rawFormData.title,
      content: rawFormData.content
    },
  };
  const data = await createNote(dataToSave);
  console.log(data)
  const flattenedData = flattenAttributes(data);
  revalidatePath("/dashboard/summaries" + videoId + "/notes");
  return {
    ...prevState,
    type: "CREATE_NOTE",
    data: flattenedData,
    errors: null,
  };
}