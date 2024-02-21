"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import { createSummaryAction } from "@/data/actions/summary-actions";
import { cn, extractYouTubeID } from "@/lib/utils";
import { StrapiErrors } from "../StrapiErrors";

interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

export function SummarizeForm({
  token,
}: {
  readonly token: string | undefined;
}) {
  console.log("token", token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrapiErrorsProps>({
    message: null,
    name: "",
    status: null,
  });

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    const url = process.env.NEXT_PUBLIC_SUMMARIZE_URL;

    if (url === undefined) throw new Error("No summarize URL found");
    if (token === undefined) throw new Error("No token found");

    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") as string;

    const processedVideoId = extractYouTubeID(videoId);
    if (!processedVideoId) throw new Error("Invalid Youtube Video ID");

    const response = await fetch(url + `/${processedVideoId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const payload = {
      data: {
        videoId: processedVideoId,
        summary: data.response,
      },
    };

    console.log("response", data);

    if (!response.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    const testResponse = await createSummaryAction(payload);
    console.log("response", testResponse);

    setLoading(false);
    // do something here
  }

  console.log("error", error);

  const errorStyles = error.status ? "outline-1 outline outline-red-500 text-red-700" : "";
  
  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center"
        key={error.message ? error.message : "form"}
      >
          <Input
            name="videoId"
            placeholder={"Youtube Video ID or URL"}
            defaultValue={error.message ? error.message : ""}
            className={cn("w-full", errorStyles)}
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
