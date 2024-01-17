import { flattenAttributes } from "@/lib/utils";
import { updateSummaryAction } from "@/actions/update-summary-action";
import { deleteSummaryAction } from "@/actions/delete-summary-action";

import { TextareaCustom } from "@/components/custom/TextareaCustom";
import { TrashIcon } from "@/components/icons/TrashIcon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

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
    <div className="grid gap-4 grid-cols-2">
      {data.map((item: any) => (
        <SummaryCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function SummaryCard({ item }: { readonly item: any }) {
  const deleteUserById = deleteSummaryAction.bind(null, item.id);

  return (
    <Card className="mb-8 relative">
      <CardHeader>
        <CardTitle>Video Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <form action={updateSummaryAction}>
            <TextareaCustom
              name="summary"
              className="w-full mb-4"
              defaultValue={item.summary}
            />
            <input type="hidden" name="id" value={item.id} />
            <Button className="absolute right-4 bottom-4" type="submit">
              Update
            </Button>
          </form>
          <form action={deleteUserById}>
            <Button
              className="absolute right-4 top-4 bg-red-700 hover:bg-red-600"
              type="submit"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
