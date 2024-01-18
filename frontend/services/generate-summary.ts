import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SimpleSequentialChain } from "langchain/chains";
import { YoutubeTranscript } from "youtube-transcript";
import { transformData } from "@/lib/utils";

interface InitializeModelProps {
  openAIApiKey: string;
  model: string;
  temp: number;
  maxTokens?: number;
}

async function initializeModel({
  openAIApiKey,
  model,
  temp,
}: InitializeModelProps) {
  return new OpenAI({
    temperature: temp,
    openAIApiKey: openAIApiKey,
    modelName: model,
    maxTokens: 1000,
  });
}

async function getTranscript(id: string) {
  const response = await YoutubeTranscript.fetchTranscript(id);
  return response;
}

export async function generateSummary(videoId: string) {
  const model = await initializeModel({
    openAIApiKey: process.env.OPEN_AI_API_KEY || "",
    model: process.env.OPEN_AI_MODEL || "gpt-4-vision-preview",
    temp: 0.7,
  });

  const synopsis_template = `
    INSTRUCTIONS: 
      1. Summarize the following {text} and include key topics 
      2. Write using normal tone of voice
      3. Write in first person 
      4. Generate title based on the content and include on the top of the summary
      5. Summarize including key points and benefits
      6. Return summary
      4. Return bulleted list of key points and benefits
      7. Finally write a short blog post based on the content, return in markdown format, include heading and sub headings.
      8. Write in first person
`;

  const synopsis_prompt = new PromptTemplate({
    template: synopsis_template,
    inputVariables: ["text"],
  });

  const generate_synopsis = new LLMChain({
    llm: model,
    prompt: synopsis_prompt,
  });

  const overall_chain = new SimpleSequentialChain({
    chains: [generate_synopsis],
    verbose: true,
  });

  const data = await getTranscript(videoId);
  const transformedData = transformData(data);
  const response = await overall_chain.run(transformedData.text);
  return response;
}
