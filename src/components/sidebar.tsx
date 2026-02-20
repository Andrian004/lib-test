import Link from 'next/link';

const menus = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/users', label: 'Users' },
  { href: '/dashboard/products', label: 'Products' },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/10 bg-slate-950/80 p-6 backdrop-blur md:block">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-300">Management Suite</p>
        <h1 className="mt-2 text-2xl font-bold text-white">Control Center</h1>
      </div>
      <nav className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="block rounded-xl border border-transparent bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-indigo-400/60 hover:bg-indigo-500/10"
          >
            {menu.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
