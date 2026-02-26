import { AIAgent } from "actient";
import { GeminiIntentParser } from "actient/providers/gemini";

export const agent = new AIAgent({
  ai: new GeminiIntentParser({
    apiKey: process.env.GEMINI_API_KEY as string,
    model: "gemini-3-flash-preview",
  }),
});
