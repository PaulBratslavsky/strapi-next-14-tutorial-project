"use server";
import { flattenAttributes } from "@/lib/utils";
import { saveSummary } from "@/services/save-summary";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function saveSummaryAction(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const dataToSave = {
    data: {
      videoId: rawFormData.videoId,
      summary: rawFormData.summary,
    },
  };
  const data = await saveSummary(dataToSave);
  const flattenedData = flattenAttributes(data);
  revalidatePath("/dashboard/summaries");
  redirect("/dashboard/summaries/" + flattenedData.id);
}
