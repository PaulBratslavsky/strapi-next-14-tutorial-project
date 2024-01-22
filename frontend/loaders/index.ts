import { flattenAttributes } from "@/lib/utils";
import qs from "qs";

const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export function getVideoDataById(videoId: string) {
  return fetchData(`${baseUrl}/api/videos/${videoId}`);
}

export function getTranscripts() {
  return fetchData(`${baseUrl}/api/videos`);
}

export function getNotes(videoId: string) {
  const query = qs.stringify({
    filters: {
      video: { id: videoId },
    },
    populate: {
      video: {
        fields: ["id"],
      },
    },
  });
  return fetchData(`${baseUrl}/api/notes?${query}`);
}
