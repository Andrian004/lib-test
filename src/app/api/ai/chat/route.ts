import { NextResponse } from "next/server";
import { agent } from "./_actions/product.actions";

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

  // const apiKey = process.env.OPENAI_API_KEY;

  // if (!apiKey) {
  //   const lastPrompt = userMessages.at(-1)?.content ?? '';
  //   return NextResponse.json({
  //     reply:
  //       `Mode demo aktif (OPENAI_API_KEY belum diatur).\n\n` +
  //       `Saya menerima pertanyaan: "${lastPrompt}"\n\n` +
  //       'Saran cepat: cek metrik produk low-stock, evaluasi kategori dengan margin tertinggi, lalu buat alert restock mingguan.',
  //   });
  // }

  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${apiKey}`,
  //   },
  //   body: JSON.stringify({
  //     model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
  //     temperature: 0.4,
  //     messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...userMessages],
  //   }),
  // });

  // if (!response.ok) {
  //   const error = await response.text();
  //   return NextResponse.json({ message: `Gagal memproses AI response: ${error}` }, { status: 500 });
  // }

  // const data = (await response.json()) as {
  //   choices?: Array<{ message?: { content?: string } }>;
  // };

  // const reply = data.choices?.[0]?.message?.content?.trim();

  // if (!reply) {
  //   return NextResponse.json({ message: 'AI tidak mengembalikan jawaban.' }, { status: 500 });
  // }

  // return NextResponse.json({ reply });
}
