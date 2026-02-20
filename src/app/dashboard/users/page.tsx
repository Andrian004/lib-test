'use client';

import { useEffect, useState } from 'react';
import { dateID } from '@/lib/format';

type Role = 'ADMIN' | 'MANAGER' | 'STAFF';

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};

const initialForm = { name: '', email: '', role: 'STAFF' as Role };

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState(initialForm);

  async function fetchUsers() {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm(initialForm);
    fetchUsers();
  }

  async function onDelete(id: string) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Master Data</p>
        <h2 className="mt-2 text-3xl font-bold">User Management</h2>
      </header>

      <form onSubmit={onSubmit} className="card grid gap-3 md:grid-cols-4">
        <input className="input" placeholder="Nama user" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} required />
        <select className="input" value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as Role }))}>
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
          <option value="STAFF">STAFF</option>
        </select>
        <button className="btn bg-indigo-500 text-white hover:bg-indigo-400" type="submit">Tambah User</button>
      </form>

      <div className="card overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="pb-3">Nama</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Dibuat</th>
              <th className="pb-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-slate-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-3">{user.name}</td>
                <td className="py-3">{user.email}</td>
                <td className="py-3">{user.role}</td>
                <td className="py-3">{dateID(user.createdAt)}</td>
                <td className="py-3 text-right">
                  <button className="btn bg-rose-500/20 text-rose-200 hover:bg-rose-500/30" onClick={() => onDelete(user.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
