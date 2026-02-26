import { NextResponse } from "next/server";
import { agent } from "@/lib/ai-agent";
import { registerActions } from "./_actions/actions";

registerActions();

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as { messages?: ChatMessage[] };
  const userMessages = (body.messages ?? []).filter(
    (message) => message.role !== "system",
  );

  if (!userMessages.length) {
    return NextResponse.json(
      { message: "Pesan tidak boleh kosong." },
      { status: 400 },
    );
  }

  const lastPrompt = userMessages.at(-1)?.content ?? "";

  const { message } = await agent.execute(lastPrompt);

  return NextResponse.json({ reply: message });
}
