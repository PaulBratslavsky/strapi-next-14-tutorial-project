import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createNoteAction } from "@/actions/create-note-action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  type: null,
  data: null,
  error: null,
};

export default function CreateNoteForm({ videoId }: { videoId: string }) {
  const [createState, createNote] = useFormState(
    createNoteAction,
    initialState
  );

  console.log(createState);

  const { pending } = useFormStatus();
  console.log(pending);

  return (
    <form className="space-y-4" action={createNote}>
      <div className="space-y-4">
        <Input id="title" name="title" placeholder="Title" required />
        <Textarea
          id="content"
          name="content"
          placeholder="Write your note here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          required
        />
        <input type="hidden" name="videoId" value={videoId} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" aria-disabled={pending}>
          Save Note
        </Button>
      </div>
    </form>
  );
}
