"use server";
import { revalidatePath } from "next/cache";
import { flattenAttributes } from "@/lib/utils";
import { redirect } from "next/navigation";

import { saveSummary } from "@/data/services/save-summary";
import { updateSummary } from "@/data/services/update-summary";
import { deleteSummary } from "@/data/services/delete-summary";
import { generateSummary } from "@/data/services/generate-summary";

export async function generateSummaryAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const videoId = rawFormData.videoId as string;
  const generateData = await generateSummary(videoId);

  const dataToSave = {
    data: {
      videoId: rawFormData.videoId,
      summary: generateData,
    },
  };
  const data = await saveSummary(dataToSave);
  const flattenedData = flattenAttributes(data);
  console.log("flattenedData", flattenedData);
  redirect("/dashboard/summaries");
}


export async function updateSummaryAction( formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const id = rawFormData.id as string;
  const dataToUpdate = {
    data: {
      summary: rawFormData.summary,
    }
  };
  const data = await updateSummary(dataToUpdate, id);
  revalidatePath("/dashboard/summaries/" + id);
  return { data, message: "generateSummaryAction" };
}


export async function deleteSummaryAction(id: string) {
  const data = await deleteSummary(id);
  const flattenedData = flattenAttributes(data);
  console.log("data", flattenedData);
  redirect("/dashboard/summaries");
}

