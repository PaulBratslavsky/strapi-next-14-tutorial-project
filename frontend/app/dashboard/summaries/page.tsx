import RenderList from "@/components/custom/RenderList";
import { LinkCard } from "@/components/custom/LinkCard";
import { getTranscripts } from "@/data/loaders";

export default async function SummariesRoute() {
  const { data } = await getTranscripts();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <RenderList data={data} component={LinkCard} />
    </div>
  );
}
