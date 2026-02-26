import { redirect } from 'next/navigation';
import { AuthForm } from '@/components/auth/auth-form';
import { getSessionFromCookies } from '@/lib/auth';

export default function RegisterPage() {
  const session = getSessionFromCookies();
  if (session) redirect('/dashboard');

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <AuthForm mode="register" />
    </main>
  );
}
