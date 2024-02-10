"use server";
import { flattenAttributes } from "@/lib/utils";
import { deleteSummary } from "@/data/services/delete-summary";
import { redirect } from "next/navigation";

export async function deleteSummaryAction(id: string) {
  const data = await deleteSummary(id);
  const flattenedData = flattenAttributes(data);
  console.log("data", flattenedData);
  redirect("/dashboard/summaries");
}
