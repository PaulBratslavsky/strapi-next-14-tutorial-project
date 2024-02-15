"use client";
import React from "react";
import { useFormState } from "react-dom";
import { createNoteAction } from "@/data/actions/note-actions";
import { cn } from "@/lib/utils";

import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import ImagePicker from "@/components/custom/ImagePicker";

interface ProfileImageFormProps {
  id: string;
  url: string;
  alternativeText: string;
}

const initialState = {
  type: null,
  data: null,
  error: null,
};

export function ProfileImageForm({
  data,
  className,
}: {
  data: Readonly<ProfileImageFormProps>;
  className?: string;
}) {
  const [createState, createNote] = useFormState(
    createNoteAction,
    initialState
  );

  return (
    <form
      className={cn("space-y-4", className)}
      action={createNote}
      key={createState.data?.id || ""}
    >
      <div className="">
        <ImagePicker
          id="image"
          name="image"
          label="Profile Image"
          defaultValue={data.url || ""}
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
      </div>
    </form>
  );
}
