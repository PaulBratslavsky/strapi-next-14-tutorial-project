"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import { toast } from "sonner"

import { createSummaryAction } from "@/data/actions/summary-actions";
import { cn, extractYouTubeID } from "@/lib/utils";

interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

interface SummaryFormProps {
  token: string | undefined;
}

const INITIAL_STATE = {
  message: null,
  name: "",
  status: null,
};


export function SummarizeForm({ token }: Readonly<SummaryFormProps>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrapiErrorsProps>(INITIAL_STATE);
  const [value, setValue] = useState<string>("");

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    const url = process.env.NEXT_PUBLIC_SUMMARIZE_URL;

    if (url === undefined) throw new Error("No summarize URL found");
    if (token === undefined) throw new Error("No token found");

    setLoading(true);
    toast.success("Creating your summary");

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") as string;

    const processedVideoId = extractYouTubeID(videoId);

    if (!processedVideoId) {
      toast.error("Invalid Youtube Video ID");
      setLoading(false);
      setValue("");
      setError({
        ...INITIAL_STATE,
        message: "Invalid Youtube Video ID",
        name: "Invalid Id",
      });
      return;
    }

    const response = await fetch(url + `/${processedVideoId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });


    if (!response.ok ) {
      console.log(response.status, response.statusText)
      toast.error(response.statusText);
      setLoading(false);
      return;
    }

    const data = await response.json();

    if(data.error) {
      setValue("");
      toast.error(data.error.message);
      setError(data.error);
      setLoading(false);
      return;
    }

    const payload = {
      data: {
        videoId: processedVideoId,
        summary: data.response,
      },
    };

    if (!response.ok) {
      setValue("");
      toast.error(data.error.message);
      setError(data.error);
      setLoading(false);
      return;
    }

    await createSummaryAction(payload);
    toast.success("Summary Created!");

    setValue("");
    setLoading(false);
  }

  function clearError() {
    setError(INITIAL_STATE);
    if (error.message) setValue("");
  }

  const errorStyles = error.message
    ? "outline-1 outline outline-red-500 placeholder:text-red-700"
    : "";

  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center"
      >
        <Input
          name="videoId"
          placeholder={
            error.message ? error.message : "Youtube Video ID or URL"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={clearError}
          className={cn("w-full focus:text-black", errorStyles)}
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
