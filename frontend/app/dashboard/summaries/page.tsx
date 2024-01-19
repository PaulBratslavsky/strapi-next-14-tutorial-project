import RenderList from "@/components/custom/RenderList";
import { LinkCard } from "@/components/custom/LinkCard";
import { getTranscripts } from "@/loaders";

export default async function SummariesRoute() {
  const { data } = await getTranscripts();
  return <RenderList 
    data={data} 
    component={LinkCard}
  />;
}
