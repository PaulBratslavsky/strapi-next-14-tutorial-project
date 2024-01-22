import { updateNoteAction } from "@/actions/update-note-action";
import { deleteNoteAction } from "@/actions/delete-note-action";

import { TextareaCustom } from "@/components/custom/TextareaCustom";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

export function NoteCard({
  item,
  className,
}: {
  readonly item: any;
  readonly className?: string;
}) {
  const deleteNoteById = deleteNoteAction.bind(null, item.id);

  return (
    <Card className={cn("mb-8 relative h-auto", className)}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <form action={updateNoteAction}>
            <TextareaCustom
              name="content"
              className="w-full mb-4 h-[calc(100vh-245px)] "
              defaultValue={item.content}
            />
            <input type="hidden" name="id" value={item.id} />
            <Button className="absolute right-4 bottom-4" type="submit">
              Update
            </Button>
          </form>
          <form action={deleteNoteById}>
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
