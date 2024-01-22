import { flattenAttributes } from "@/lib/utils";
import qs from "qs";
import { unstable_noStore as noStore } from "next/cache";

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

export function getVideoById(videoId: string) {
  return fetchData(`${baseUrl}/api/videos/${videoId}`);
}

export function getTranscripts() {
  noStore();
  const query = qs.stringify({ sort: ["createdAt:desc"] });
  return fetchData(`${baseUrl}/api/videos?${query}`);
}

export function getNotes(videoId: string) {
  noStore();

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

export function getNoteById(noteId: string) {
  return fetchData(`${baseUrl}/api/notes/${noteId}`);
}
