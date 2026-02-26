import { AIAgent } from "actient";
import { GeminiIntentParser } from "actient/providers/gemini";

export const agent = new AIAgent({
  ai: new GeminiIntentParser({
    apiKey: "AIzaSyCJPH6g063zPa-OoTNFy-RXV0FkUZpHoIY",
    model: "gemini-3-flash-preview",
  }),
});
