"use client";
import React from "react";
import { useFormState } from "react-dom";
import { createNoteAction } from "@/data/actions/note-actions";

import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import ImagePicker from "@/components/custom/ImagePicker";

const initialState = {
  type: null,
  data: null,
  error: null,
};

export function ProfileImageForm() {
  const [createState, createNote] = useFormState(
    createNoteAction,
    initialState
  );

  return (
    <form className="space-y-4" action={createNote} key={createState.data?.id || ""}>
      <div className="">
        <ImagePicker 
          id="image"
          name="image"
          label="Profile Image"
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile"/>
      </div>
    </form>
  );
}
