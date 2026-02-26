import { agent } from "@/lib/ai-agent";
import { z } from "zod";

// default action when intent is unknown
export default function defaultActions() {
  agent.registerAction("UNKNOWN", {
    description: "Default handler for unknown intents",
    rules: [
      "Response with same language of user",
      "Handle unknown intents gracefully and inform the user.",
      "Response must be interactive like if user input 'hello' you can response 'Hello, can I help you?'",
    ],
    schema: z.object({
      message: z.string(),
    }),
    handler: async ({ message }) => {
      return { message };
    },
  });
}
