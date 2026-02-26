import { prisma } from '@/lib/prisma';
import { currencyIDR } from '@/lib/format';

export default async function DashboardPage() {
  const [userCount, productCount, lowStockCount, products] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.product.count({ where: { stock: { lt: 10 } } }),
    prisma.product.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
  ]);

  const totalInventory = products.reduce((sum, product) => sum + Number(product.price) * product.stock, 0);
  const maxStock = Math.max(...products.map((product) => product.stock), 1);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Analytics</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Dashboard Overview</h2>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="card"><p className="text-sm text-slate-400">Total Users</p><p className="mt-3 text-3xl font-semibold">{userCount}</p></div>
        <div className="card"><p className="text-sm text-slate-400">Total Products</p><p className="mt-3 text-3xl font-semibold">{productCount}</p></div>
        <div className="card"><p className="text-sm text-slate-400">Low Stock (&lt;10)</p><p className="mt-3 text-3xl font-semibold text-amber-300">{lowStockCount}</p></div>
        <div className="card"><p className="text-sm text-slate-400">Inventory Value</p><p className="mt-3 text-2xl font-semibold text-emerald-300">{currencyIDR(totalInventory)}</p></div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold">Stock Distribution</h3>
          <div className="mt-5 space-y-4">
            {products.map((product) => (
              <div key={product.id}>
                <div className="mb-1 flex justify-between text-sm text-slate-300">
                  <span>{product.name}</span>
                  <span>{product.stock}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" style={{ width: `${(product.stock / maxStock) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold">Estimated Revenue Trend</h3>
          <div className="mt-8 flex h-48 items-end justify-between gap-2">
            {products.map((product, idx) => {
              const value = Number(product.price) * product.stock;
              const height = Math.max((value / Math.max(totalInventory, 1)) * 100, 8);

              return (
                <div key={product.id} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-xl bg-gradient-to-t from-indigo-500/70 to-cyan-300/80" style={{ height: `${height}%` }} />
                  <span className="text-xs text-slate-400">M{idx + 1}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-slate-400">Visual trend berdasarkan estimasi nilai produk terbaru.</p>
        </div>
      </section>
    </div>
  );
}
