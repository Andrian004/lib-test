import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { getSessionFromCookies } from '@/lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = getSessionFromCookies();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
