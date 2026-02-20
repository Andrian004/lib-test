import { NextResponse } from 'next/server';
import { Status } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const status = Object.values(Status).includes(body.status) ? body.status : undefined;

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name,
      sku: body.sku,
      category: body.category,
      price: Number(body.price),
      stock: Number(body.stock),
      status,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Produk dihapus.' });
}
