import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { hashPassword, setSessionCookie, signSessionToken } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');

  if (!name || !email || password.length < 6) {
    return NextResponse.json({ message: 'Nama, email, dan password minimal 6 karakter wajib diisi.' }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ message: 'Email sudah terdaftar.' }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashPassword(password),
      role: Role.STAFF,
    },
  });

  const token = signSessionToken({ userId: user.id, email: user.email, role: user.role });
  setSessionCookie(token);

  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
}
