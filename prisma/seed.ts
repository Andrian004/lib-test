import { PrismaClient, Role, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Rani Putri', email: 'rani@company.id', role: Role.ADMIN },
      { name: 'Budi Santoso', email: 'budi@company.id', role: Role.MANAGER },
      { name: 'Dewi Anggraeni', email: 'dewi@company.id', role: Role.STAFF },
    ],
    skipDuplicates: true,
  });

  await prisma.product.createMany({
    data: [
      { name: 'Headphone Pro X', sku: 'HPROX-001', category: 'Elektronik', price: 1299000, stock: 55, status: Status.ACTIVE },
      { name: 'Smart Lamp', sku: 'SLAMP-010', category: 'Smart Home', price: 499000, stock: 20, status: Status.ACTIVE },
      { name: 'Kursi Ergonomis', sku: 'KERGO-230', category: 'Furniture', price: 2199000, stock: 8, status: Status.INACTIVE },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
