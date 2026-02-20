import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-8">
      <div className="card max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Next.js + Prisma + PostgreSQL</p>
        <h1 className="mt-4 text-4xl font-bold text-white">Product & User Management</h1>
        <p className="mt-3 text-slate-300">Kelola user, produk, dan lihat analytics bisnis dalam satu dashboard modern.</p>
        <Link href="/dashboard" className="btn mt-6 inline-block bg-indigo-500 text-white hover:bg-indigo-400">
          Buka Dashboard
        </Link>
      </div>
    </main>
  );
}
