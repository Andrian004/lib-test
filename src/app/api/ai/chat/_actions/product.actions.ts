import { AIAgent } from "actient";
import { GeminiIntentParser } from "actient/providers/gemini";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import productRules from "../_rules/product.rules";

export const agent = new AIAgent({
  ai: new GeminiIntentParser({
    apiKey: "AIzaSyCJPH6g063zPa-OoTNFy-RXV0FkUZpHoIY",
    model: "gemini-3-flash-preview",
  }),
});

agent.registerAction("manage_products", {
  description: "Product management",
  rules: productRules,
  schema: z.object({
    action: z.enum(["create", "create_many", "update", "delete", "find"]),
    query: z.object({}).passthrough().optional(),
    successMessage: z.string().optional(),
    errorMessage: z.string().optional(),
  }),
  handler: async ({ action, query, successMessage, errorMessage }) => {
    try {
      let result;

      switch (action) {
        case "create":
          result = await prisma.product.create(query as any);
          break;

        case "create_many":
          result = await prisma.product.createManyAndReturn(query as any);
          break;

        case "update":
          result = await prisma.product.updateMany(query as any);
          break;

        case "delete":
          result = await prisma.product.deleteMany(query as any);
          break;

        case "find":
          result = await prisma.product.findMany(query as any);
          break;
      }

      return {
        message: successMessage || "Operation successful.",
        data: result,
      };
    } catch (error: any) {
      return {
        message: errorMessage || "Operation failed.",
      };
    }
  },
});

// default action when intent is unknown
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
