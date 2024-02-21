"use client";
import React from "react";
import { mutateData } from "@/data/services/mutate-data";
import { flattenAttributes } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import { test } from "@/data/actions/test";

export function SummarizeForm() {
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") as string;
    const testUrl = "http://localhost:1337/api/summary-ai/summary";

    console.log("Job Started");
    const response = await fetch(testUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId }),
    });

    const data = await response.json();
    const flattenedData = flattenAttributes(data);

    console.log("flattenedData", flattenedData);

    const payload = {
      data: {
        videoId: videoId,
        summary: data.response,
      },
    };


    await test(payload);

    console.log("Job Finished");
    // do something here
  }

  return (
    <div className="mb-8 container mx-auto">
      <form
        onSubmit={handleFormSubmit}
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
