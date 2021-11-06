const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  // drop seeds from tables
  await prisma.productFetch.deleteMany({});
  await prisma.user.deleteMany({});

  //create test user
  const user = await prisma.user.create({
    data: {
      email: "test1@burton.com",
    },
  });
  // //create test fetching
  // const productFetch = await prisma.productFetch.createMany({
  //   data: [
  //     {
  //       userId: user.id,
  //       productId: "W22-228251",
  //       status: "IDLE",
  //     },
  //     {
  //       userId: user.id,
  //       productId: "W22-229601",
  //       status: "IDLE",
  //     },
  //     {
  //       userId: user.id,
  //       productId: "W22-220611",
  //       status: "IDLE",
  //     },
  //   ],
  // });
  // const data = { user, productFetch };
  // Object.keys(data).forEach((key) => console.log(`${[key]}:`, data[key]));
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
