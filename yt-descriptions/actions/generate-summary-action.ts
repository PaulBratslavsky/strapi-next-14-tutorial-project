"use server";
import { generateSummary } from "@/services/generate-summary";

export async function generateSummaryAction(
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData);
  const videoId = rawFormData.videoId as string;
  const data = await generateSummary(videoId);
  return {
    ...prevState,
    videoId: rawFormData.videoId,
    data,
    message: "generateSummaryAction",
  };
}
