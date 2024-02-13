import React from "react";
import { generateSummaryAction } from "@/data/actions/summary-actions";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/buttons/SubmitButton";

export function SummarizeForm() {
  return (
    <div className="mb-8 container mx-auto">
      <form
        action={generateSummaryAction}
        className="flex gap-2 items-center justify-center my-4"
      >
        <Input
          name="videoId"
          placeholder="Youtube Video ID or URL"
          className="w-full"
          required
        />
        <SubmitButton text="Create Summary" loadingText="Creating Summary" />
      </form>
    </div>
  );
}
