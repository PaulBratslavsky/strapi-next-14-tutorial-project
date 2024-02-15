"use client";
import React from "react";
import { useFormState } from "react-dom";
import { createNoteAction } from "@/data/actions/note-actions";
import { cn } from "@/lib/utils";

import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  type: null,
  data: null,
  error: null,
};

interface ProfileFormProps {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
}

export function ProfileForm({ data, className }: { data: Readonly<ProfileFormProps>, className?: string}) {
  
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
      <div className="space-y-4 grid ">
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            defaultValue={data.username || ""}
            disabled
          />
          <Input
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={data.email || ""}
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            defaultValue={data.firstName || ""}
          />
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            defaultValue={data.lastName || ""}
          />
        </div>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          defaultValue={data.bio || ""}
          required
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
      </div>
    </form>
  );
}
