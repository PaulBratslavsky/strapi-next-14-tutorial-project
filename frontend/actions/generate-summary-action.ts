"use server";
import { flattenAttributes } from "@/lib/utils";
import { redirect } from "next/navigation";
import { generateSummary } from "@/services/generate-summary";
import { saveSummary } from "@/services/save-summary";

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
