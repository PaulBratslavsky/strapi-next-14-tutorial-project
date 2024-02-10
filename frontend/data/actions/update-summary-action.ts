"use server";
import { updateSummary } from "@/data/services/update-summary";
import { revalidatePath } from "next/cache";

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
