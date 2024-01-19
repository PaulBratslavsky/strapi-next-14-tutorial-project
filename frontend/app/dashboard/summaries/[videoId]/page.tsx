"use client";
import { flattenAttributes } from "@/lib/utils";
import { SummaryCard } from "@/components/custom/SummaryCard";

async function getVideoDataById(videoId: string) {
  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
  try {
    const response = await fetch(baseUrl + "/api/videos/" + videoId);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    console.log(flattenedData);
    return flattenedData;
  } catch (error) {
    console.log("error", error);
  }
}

export default async function VideosRoute({
  params,
}: {
  readonly params: any;
}) {
  const data = await getVideoDataById(params.videoId);

  if (!data) return <p>No Items Found</p>;
  return <SummaryCard item={data} />;
}
