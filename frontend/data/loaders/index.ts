import qs from "qs";
import { flattenAttributes } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";
import { getAuthToken } from "../actions/get-token";

const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";

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

export async function getVideoById(videoId: string) {
  return fetchData(`${baseUrl}/api/videos/${videoId}`);
}

export async function getTranscripts() {
  noStore();
  const query = qs.stringify({ sort: ["createdAt:desc"] });
  return fetchData(`${baseUrl}/api/videos?${query}`);
}

export async function getNotes(videoId: string) {
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

export async function getNoteById(noteId: string) {
  return fetchData(`${baseUrl}/api/notes/${noteId}`);
}

export async function getUserMeLoader() {
  const url = `${baseUrl}/api/users/me?`;
  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
