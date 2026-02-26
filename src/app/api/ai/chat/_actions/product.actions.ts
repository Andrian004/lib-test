import { z } from "zod";
import { prisma } from "@/lib/prisma";
import productRules from "../_rules/product.rules";
import { agent } from "@/lib/ai-agent";

export default function productActions() {
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
}
