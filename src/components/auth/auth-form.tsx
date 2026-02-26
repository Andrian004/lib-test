'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Props = {
  mode: 'login' | 'register';
};

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'register' ? { name, email, password } : { email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message ?? 'Gagal memproses autentikasi.');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card w-full max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-white">{mode === 'login' ? 'Login Akun' : 'Daftar Akun'}</h1>
      <p className="text-sm text-slate-300">{mode === 'login' ? 'Masuk untuk mengakses dashboard management.' : 'Buat akun baru untuk mulai mengelola data.'}</p>

      {mode === 'register' ? (
        <input className="input" placeholder="Nama lengkap" value={name} onChange={(event) => setName(event.target.value)} required />
      ) : null}

      <input className="input" type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      <input className="input" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} />

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <button className="btn w-full bg-indigo-500 text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={loading}>
        {loading ? 'Memproses...' : mode === 'login' ? 'Login' : 'Register'}
      </button>

      {mode === 'login' ? (
        <p className="text-sm text-slate-300">Belum punya akun? <Link href="/register" className="text-indigo-300">Daftar</Link></p>
      ) : (
        <p className="text-sm text-slate-300">Sudah punya akun? <Link href="/login" className="text-indigo-300">Login</Link></p>
      )}
    </form>
  );
}
