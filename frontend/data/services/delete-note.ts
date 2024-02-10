import qs from "qs";

const query = qs.stringify({
  populate: "video",
});

export async function deleteNote(id: string) {
  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
  try {
    const response = await fetch(baseUrl + "/api/notes/" + id + "?" + query, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}
