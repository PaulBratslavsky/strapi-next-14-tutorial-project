"use client";
import React from "react";
import { useFormState } from "react-dom";
import { createNoteAction } from "@/data/actions/note-actions";

import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  type: null,
  data: null,
  error: null,
};

export function ProfileForm() {
  const [createState, createNote] = useFormState(
    createNoteAction,
    initialState
  );

  return (
    <form
      className="space-y-4"
      action={createNote}
      key={createState.data?.id || ""}
    >
      <div className="space-y-4 grid ">
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            disabled
          />
          <Input id="email" name="email" placeholder="Email" disabled />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input id="firstName" name="firstName" placeholder="First Name" />
          <Input id="lastName" name="lastName" placeholder="Last Name" />
        </div>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          required
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
      </div>
    </form>
  );
}
