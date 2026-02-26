'use client';

import { FormEvent, useState } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AiSupportPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Halo! Saya AI Support. Kamu bisa tanya insight stok, user growth, atau rekomendasi aksi dari data dashboard.',
    },
  ]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || loading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmedPrompt }];
    setMessages(nextMessages);
    setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Terjadi kesalahan saat menghubungi AI.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">AI Assistant</p>
        <h2 className="mt-2 text-3xl font-bold">AI Support</h2>
        <p className="mt-2 text-sm text-slate-300">Ngobrol dengan AI untuk insight cepat dari aktivitas product dan user management.</p>
      </header>

      <section className="card">
        <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${
                  message.role === 'user'
                    ? 'bg-indigo-500 text-white'
                    : 'border border-white/10 bg-white/5 text-slate-100'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading ? <p className="text-sm text-slate-400">AI sedang mengetik...</p> : null}
        </div>

        <form className="mt-6 flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Contoh: Produk mana yang perlu restock minggu ini?"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            disabled={loading}
          />
          <button className="btn bg-indigo-500 text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={loading}>
            Kirim
          </button>
        </form>
      </section>
    </div>
  );
}
