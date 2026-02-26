import Link from 'next/link';

const stats = [
  { label: 'Active Teams', value: '120+' },
  { label: 'Products Tracked', value: '14.2K' },
  { label: 'Monthly Automation', value: '98.7%' },
];

const highlights = [
  'Real-time analytics board',
  'AI support assistant',
  'Secure auth & role management',
  'Modern product + user workflows',
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-10 lg:pt-14">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">
          <p className="text-sm tracking-wide text-slate-300">⚡ Product User Management Suite</p>
          <div className="flex gap-2">
            <Link href="/login" className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-indigo-400/60 hover:text-white">
              Login
            </Link>
            <Link href="/register" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200">
              Get Started
            </Link>
          </div>
        </header>

        <section className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-200">
              New Generation Dashboard Experience
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              Kelola bisnis lebih cerdas, visual, dan super cepat.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              Redesign total untuk pengalaman yang berani dan modern: analytics berbasis insight, alur kerja produk + user yang rapi, serta AI support untuk keputusan harian.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02]">
                Masuk ke Dashboard
              </Link>
              <Link href="/dashboard/ai-support" className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-cyan-400/10">
                Coba AI Support
              </Link>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {highlights.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500/30 via-cyan-400/20 to-fuchsia-500/30 blur-xl" />
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
              <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400">{stat.label}</p>
                    <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 p-5">
                <p className="text-sm text-slate-200">Weekly Performance</p>
                <div className="mt-4 flex h-36 items-end gap-2">
                  {[35, 55, 42, 73, 68, 88, 76].map((height, idx) => (
                    <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-cyan-300 to-indigo-400"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[10px] text-slate-400">D{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-400">AI Recommendation</p>
                  <p className="mt-2 text-sm text-slate-200">Restock kategori Smart Home minggu ini untuk menjaga SLA fulfillment.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-400">User Growth</p>
                  <p className="mt-2 text-sm text-slate-200">+24% dari bulan lalu, mayoritas berasal dari tim operations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
