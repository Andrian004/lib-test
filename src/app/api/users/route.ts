import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email) {
    return NextResponse.json({ message: 'Nama dan email wajib diisi.' }, { status: 400 });
  }

  const role = Object.values(Role).includes(body.role) ? body.role : Role.STAFF;

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      role,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
