"use strict";
const { OpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("langchain/prompts");
const { LLMChain, SimpleSequentialChain, createExtractionChain } = require("langchain/chains");
const { YoutubeTranscript } = require("youtube-transcript");

function transformData(data) {
  let text = "";

  data.forEach((item) => {
    text += item.text + " ";
  });

  return {
    data: data,
    text: text.trim(),
  };
}

async function initializeModel({ openAIApiKey, model, temp, maxTokens }) {
  return new OpenAI({
    temperature: temp,
    openAIApiKey: openAIApiKey,
    modelName: model,
    maxTokens: maxTokens,
  });
}

async function getTranscript(id) {
  const response = await YoutubeTranscript.fetchTranscript(id);
  return response;
}

async function generateSummary(videoId, config) {
  const model = await initializeModel({
    openAIApiKey: config.openAIApiKey,
    model:  config.model,
    temp: config.temp,
    maxTokens: config.maxTokens,
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

  return {
    title: "title",
    response: response,
  };
}

module.exports = ({ strapi }) => ({
  async summary() {
    const pluginSettings = await strapi.config.get("plugin.summary-ai");
    try {
      const response = await generateSummary("arVNHfFCJfU", pluginSettings);
      return {
        title: response.title,
        response: response.response,}
    } catch (error) {
      console.log(error);
    }
  },
});
