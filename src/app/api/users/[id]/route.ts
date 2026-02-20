import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const role = Object.values(Role).includes(body.role) ? body.role : undefined;

  const user = await prisma.user.update({
    where: { id: params.id },
    data: {
      name: body.name,
      email: body.email,
      role,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'User dihapus.' });
}
