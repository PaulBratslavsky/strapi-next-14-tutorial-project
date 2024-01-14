"use server";
import { deleteSummary } from "@/services/delete-summary";
import { revalidatePath } from "next/cache";

export async function deleteDescriptionAction(id: string) {
  const data = await deleteSummary(id);
  revalidatePath("/");
  return { data, message: "generateSummaryAction" };
}
