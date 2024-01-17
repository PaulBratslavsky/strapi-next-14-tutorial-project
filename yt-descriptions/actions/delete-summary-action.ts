"use server";
import { deleteSummary } from "@/services/delete-summary";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction(id: string) {
  const data = await deleteSummary(id);
  console.log("data", data);
  revalidatePath("/dashboard/summaries");
}
