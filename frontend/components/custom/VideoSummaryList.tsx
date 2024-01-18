import { flattenAttributes } from "@/lib/utils";
import { LinkCard } from "@/components/custom/LinkCard";

async function getTranscripts() {
  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
  try {
    const response = await fetch(baseUrl + "/api/videos");
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    console.log(flattenedData);
    return flattenedData;
  } catch (error) {
    console.log("error", error);
  }
}

export default async function VideoSummaryList() {
  const { data } = await getTranscripts();

  if (!data) return <p>No Items Found</p>;

  return (
    <div className="grid gap-4 grid-cols-3">
      {data.map((item: any) => (
        <LinkCard key={item.id} item={item} />
      ))}
    </div>
  );
}
