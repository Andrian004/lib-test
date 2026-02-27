"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "dashboard-ai-chat-history";
const OPEN_KEY = "dashboard-ai-rightbar-open";
const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Halo! Saya AI Support. Kamu bisa tanya insight stok, user growth, atau rekomendasi aksi dari data dashboard.",
  },
];

export function AiRightbar() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    const savedOpenState = localStorage.getItem(OPEN_KEY);

    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    if (savedOpenState) {
      setOpen(savedOpenState === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(OPEN_KEY, String(open));
  }, [open]);

  useEffect(() => {
    if (!scrollContainerRef.current) {
      return;
    }

    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
  }, [messages, loading]);

  const title = useMemo(
    () => (open ? "Tutup AI Support" : "Buka AI Support"),
    [open],
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || loading) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmedPrompt },
    ];

    setMessages(nextMessages);
    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Terjadi kesalahan saat menghubungi AI.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan yang tidak diketahui.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative hidden shrink-0 xl:block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        title={title}
        className="absolute left-0 top-6 z-10 -translate-x-full rounded-l-xl border border-white/15 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
      >
        {open ? "→" : "←"}
      </button>

      <aside
        className={`h-screen border-l border-white/10 bg-slate-950/90 p-5 backdrop-blur transition-all duration-300 ${
          open ? "w-[360px] opacity-100" : "w-0 overflow-hidden border-l-0 p-0 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <header>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">AI Assistant</p>
            <h2 className="mt-2 text-xl font-bold text-white">AI Support</h2>
            <p className="mt-2 text-xs text-slate-300">Tersimpan otomatis & siap membantu analisis cepat.</p>
          </header>

          <div ref={scrollContainerRef} className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    message.role === "user"
                      ? "bg-indigo-500 text-white"
                      : "border border-white/10 bg-white/5 text-slate-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading ? <p className="text-xs text-slate-400">AI sedang mengetik...</p> : null}
          </div>

          <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Tanya AI support..."
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              disabled={loading}
            />
            <button
              className="btn bg-indigo-500 px-4 text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              Kirim
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
