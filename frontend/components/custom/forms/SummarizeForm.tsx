"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import { createSummaryAction } from "@/data/actions/summary-actions";
import { extractYouTubeID } from "@/lib/utils";

export function SummarizeForm() {
  const [loading, setLoading] = useState(false);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    const url = process.env.NEXT_PUBLIC_SUMMARIZE_URL;
    if (url === undefined) throw new Error("No summarize URL found");

    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") as string;

    const processedVideoId = extractYouTubeID(videoId);
    if (!processedVideoId) throw new Error("Invalid Youtube Video ID");

    const response = await fetch(url + `/${processedVideoId}`);
    const data = await response.json();

    const payload = {
      data: {
        videoId: processedVideoId as string,
        summary: data.response,
      },
    };

    const testResponse = await createSummaryAction(payload);
    console.log("response", testResponse);

    setLoading(false);
    // do something here
  }

  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center"
      >
        <Input
          name="videoId"
          placeholder="Youtube Video ID or URL"
          className="w-full"
          required
        />
        <SubmitButton
          text="Create Summary"
          loadingText="Creating Summary"
          loading={loading}
        />
      </form>
    </div>
  );
}
