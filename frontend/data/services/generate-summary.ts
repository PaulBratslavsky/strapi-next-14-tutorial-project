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
    model: process.env.OPEN_AI_MODEL ?? "gpt-4-vision-preview",
    temp: 0.7,
  });

  const synopsis_template = `
    INSTRUCTIONS: 
      For the this {text} complete the following steps.
      Generate the title for based on the content provided
      Summarize the following content and include key topics, writing in first person using noremal tone of voice.
      Generate bulleted list of key points and benefits
      Return possible and best recommended key words
      Write a blog post based on the content 
        - Include heading and sections.  
        - Return in markdown.  
        - Incorporate keywords and key takeaways in to the blog post.
      Write a recommendation section and include 3 to 5 ways I can improve this blog post.
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
