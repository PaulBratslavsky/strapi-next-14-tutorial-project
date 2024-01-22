"use client";

import { useFormState, useFormStatus } from "react-dom";

import { generateSummaryAction } from "@/actions/generate-summary-action";
import { saveSummaryAction } from "@/actions/save-summary-action";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";

const initialState = {
  message: null,
  data: null,
  error: null,
  videoId: null,
};

export default function Dashboard() {
  const [generateState, generateSummary] = useFormState(
    generateSummaryAction,
    initialState
  );


  const [updateState, saveSummary] = useFormState(
    saveSummaryAction,
    initialState
  );

  const onUpdate = updateState?.data?.videoId as string;

  return (
    <div className="mb-8 container mx-auto" key={onUpdate}>
      <GenerateSummaryForm formAction={generateSummary} state={generateState} />
      <SaveSummaryForm formAction={saveSummary} state={generateState} />
    </div>
  );
}

function GenerateSummaryForm({
  formAction,
  state,
}: {
  readonly formAction: any;
  readonly state: any;
}) {
  const { pending } = useFormStatus()
  console.log(pending)

  return (
    <form
      action={formAction}
      className="flex gap-2 items-center justify-center my-4"
    > 
      <Input
        name="videoId"
        placeholder="Youtube Video ID or URL"
        className="w-full"
        defaultValue={state.videId || ""}
        required
      />
      <Button type="submit" aria-disabled={pending} >{pending ? "Creating Summary" : "Create Summary"}</Button>
    </form>
  );
}

function SaveSummaryForm({
  formAction,
  state,
}: {
  readonly formAction: any;
  readonly state: any;
}) {
  if (state.data === null) return null;

  return (
    <form action={formAction} className="w-full">
      <Textarea
        name="summary"
        defaultValue={state.data}
        className="w-full h-[400px]"
      />
      <input type="hidden" name="videoId" value={state.videoId} />
      <Button className="float-right my-2" type="submit">
        Save Summary
      </Button>
    </form>
  );
}
