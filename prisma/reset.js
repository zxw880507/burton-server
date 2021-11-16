const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  // drop seeds from tables
  await prisma.demandItem.deleteMany({});
  await prisma.productFetch.deleteMany({});
  await prisma.user.deleteMany({});
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
