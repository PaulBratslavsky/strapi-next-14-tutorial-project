"use client";

import { useState, useRef } from "react"; 
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
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
  let form = useRef<HTMLFormElement>(null)

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    const url = process.env.NEXT_PUBLIC_SUMMARIZE_URL;

    if (url === undefined) throw new Error("No summarize URL found");
    if (token === undefined) throw new Error("No token found");

    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") as string;

    const processedVideoId = extractYouTubeID(videoId);
    
    if (!processedVideoId) {
      setLoading(false);
      return setError({
        ...INITIAL_STATE,
        message: "Invalid Youtube Video ID",
        name: "Invalid Id",
      });
    }

    const response = await fetch(url + `/${processedVideoId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    const payload = {
      data: {
        videoId: processedVideoId,
        summary: data.response,
      },
    };

    if (!response.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    await createSummaryAction(payload);
    form.current?.reset();
    setLoading(false);
  }


  const errorStyles = error.message
    ? "outline-1 outline outline-red-500 text-red-700"
    : "";

  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center"
        ref={form}
      >
        <Input
          name="videoId"
          placeholder={"Youtube Video ID or URL"}
          defaultValue={error.message ? error.message : ""}
          onMouseDown={() => setError(INITIAL_STATE)}
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
