import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setSessionCookie, signSessionToken, verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');

  if (!email || !password) {
    return NextResponse.json({ message: 'Email dan password wajib diisi.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ message: 'Email atau password tidak valid.' }, { status: 401 });
  }

  const token = signSessionToken({ userId: user.id, email: user.email, role: user.role });
  setSessionCookie(token);

  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}
