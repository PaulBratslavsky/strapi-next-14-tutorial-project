import RenderList from "@/components/custom/RenderList";
import { LinkCard } from "@/components/custom/LinkCard";
import { getTranscripts } from "@/data/loaders";
import { Search } from "@/components/custom/Search";
import Pagination from "@/components/custom/Pagination";

export default async function SummariesRoute() {
  const { data } = await getTranscripts();
  return (
    <div className="grid grid-cols-1 gap-4 mx-4">
      <Search />
      <RenderList data={data} component={LinkCard} />
      <Pagination totalPages={5} />
    </div>
  );
}
