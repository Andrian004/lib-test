'use client';

import { useEffect, useState } from 'react';
import { currencyIDR } from '@/lib/format';

type Status = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: Status;
};

const initialForm = {
  name: '',
  sku: '',
  category: '',
  price: 0,
  stock: 0,
  status: 'ACTIVE' as Status,
};

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(initialForm);

  async function fetchProducts() {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm(initialForm);
    fetchProducts();
  }

  async function onDelete(id: string) {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Master Data</p>
        <h2 className="mt-2 text-3xl font-bold">Product Management</h2>
      </header>

      <form onSubmit={onSubmit} className="card grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <input className="input" placeholder="Nama produk" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
        <input className="input" placeholder="SKU" value={form.sku} onChange={(e) => setForm((prev) => ({ ...prev, sku: e.target.value }))} required />
        <input className="input" placeholder="Kategori" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} required />
        <input className="input" type="number" placeholder="Harga" value={form.price} min={1} onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))} required />
        <input className="input" type="number" placeholder="Stock" value={form.stock} min={0} onChange={(e) => setForm((prev) => ({ ...prev, stock: Number(e.target.value) }))} required />
        <button className="btn bg-indigo-500 text-white hover:bg-indigo-400" type="submit">Tambah Produk</button>
      </form>

      <div className="card overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="pb-3">Produk</th>
              <th className="pb-3">SKU</th>
              <th className="pb-3">Kategori</th>
              <th className="pb-3">Harga</th>
              <th className="pb-3">Stock</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-slate-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-3">{product.name}</td>
                <td className="py-3">{product.sku}</td>
                <td className="py-3">{product.category}</td>
                <td className="py-3">{currencyIDR(Number(product.price))}</td>
                <td className="py-3">{product.stock}</td>
                <td className="py-3">{product.status}</td>
                <td className="py-3 text-right">
                  <button className="btn bg-rose-500/20 text-rose-200 hover:bg-rose-500/30" onClick={() => onDelete(product.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
