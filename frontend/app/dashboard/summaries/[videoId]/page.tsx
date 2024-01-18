"use client";
import { flattenAttributes } from "@/lib/utils";
import YouTubePlayer from "@/components/custom/YouTubePlayer";
import { SummaryCard } from "@/components/custom/SummaryCard";
import { BackButton } from "@/components/custom/BackButton";

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
  console.log(data);
  return (
    <div className="h-full grid gap-4 grid-cols-5">
      <SummaryCard item={data} className="col-span-3" />
      <div className="col-span-2">
        <div className="rounded-lg overflow-hidden">
          <YouTubePlayer
            key={data.id}
            playerKey={data.id}
            id={"oBpbABVG21c"}
            height="365px"
          />
        </div>
        <BackButton className="float-right my-3" />
      </div>
    </div>
  );
}
