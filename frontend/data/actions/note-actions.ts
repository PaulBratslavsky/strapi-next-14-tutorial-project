"use server";
import { flattenAttributes } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createNote } from "@/data/services/create-note";
import { deleteNote } from "@/data/services/delete-note";
import { updateNote } from "@/data/services/update-note";


export async function createNoteAction(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const videoId = rawFormData.videoId;
  const dataToSave = {
    data: {
      video: rawFormData.videoId,
      title: rawFormData.title,
      content: rawFormData.content
    },
  };
  const data = await createNote(dataToSave);
  const flattenedData = flattenAttributes(data);
  revalidatePath("/dashboard/summaries" + videoId + "/notes");
  return {
    ...prevState,
    type: "CREATE_NOTE",
    data: flattenedData,
    errors: null,
  };
}

export async function deleteNoteAction(id: string) {
  const data = await deleteNote(id);
  const flattenedData = flattenAttributes(data);
  redirect("/dashboard/summaries/" + flattenedData.video.id + "/notes");
}

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
