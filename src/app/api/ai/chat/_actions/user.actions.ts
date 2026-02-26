import { z } from "zod";
import { prisma } from "@/lib/prisma";
import userRules from "../_rules/user.rules";
import { agent } from "@/lib/ai-agent";
import { hashPassword } from "@/lib/auth";

export default function userActions() {
  agent.registerAction("manage_user", {
    description: "User management",
    rules: userRules,
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
            if (query && typeof query === "object" && "data" in query) {
              const q = query as { data: any };
              q.data.passwordHash = hashPassword(q.data.passwordHash);
              result = await prisma.user.create(q as any);
            }
            break;

          case "create_many":
            result = await prisma.user.createManyAndReturn(query as any);
            break;

          case "update":
            result = await prisma.user.updateMany(query as any);
            break;

          case "delete":
            result = await prisma.user.deleteMany(query as any);
            break;

          case "find":
            result = await prisma.user.findMany(query as any);
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
