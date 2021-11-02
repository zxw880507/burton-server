const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function main() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
  try {
    const user = await prisma.user.create({
      data: {
        email: "test1@burton.com",
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

main();
