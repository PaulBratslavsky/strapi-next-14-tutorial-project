"use server";
import { flattenAttributes } from "@/lib/utils";
import { deleteSummary } from "@/services/delete-summary";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction(id: string) {
  const data = await deleteSummary(id);
  const flattenedData = flattenAttributes(data);
  console.log("data", flattenedData);
  revalidatePath("/dashboard/summaries");
}
