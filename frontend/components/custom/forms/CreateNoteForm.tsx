"use client";
import React from "react";
import { useFormState } from "react-dom";
import { createNoteAction } from "@/actions/create-note-action";

import { SubmitButton } from "@/components/custom/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  type: null,
  data: null,
  error: null,
};

export function CreateNoteForm({ videoId }: { videoId: string }) {
  const [createState, createNote] = useFormState(
    createNoteAction,
    initialState
  );

  console.log(createState);

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
        <SubmitButton text="Save Note" loadingText="Saving Note"/>
      </div>
    </form>
  );
}
