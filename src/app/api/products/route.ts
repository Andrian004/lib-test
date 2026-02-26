import { NextResponse } from 'next/server';
import { Status } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.sku || !body.category || Number(body.price) <= 0) {
    return NextResponse.json({ message: 'Lengkapi data produk dengan benar.' }, { status: 400 });
  }

  const status = Object.values(Status).includes(body.status) ? body.status : Status.ACTIVE;

  const product = await prisma.product.create({
    data: {
      name: body.name,
      sku: body.sku,
      category: body.category,
      price: Number(body.price),
      stock: Number(body.stock ?? 0),
      status,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
