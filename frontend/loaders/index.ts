import { flattenAttributes } from "@/lib/utils";
const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";

export async function getVideoDataById(videoId: string) {
  try {
    const response = await fetch(baseUrl + "/api/videos/" + videoId);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getTranscripts() {
  try {
    const response = await fetch(baseUrl + "/api/videos");
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.log("error", error);
  }
}
