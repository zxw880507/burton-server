import nc from "next-connect";
import cors from "cors";
import { prisma } from "../../../lib/prisma";
// import { dataReformat } from "../../../utils/helpers";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const { action } = req.query;
    const actionSerialize = JSON.parse(action);
    const pid = "W22-228251";
    const email = "test1@burton.com";

    switch (actionSerialize.type) {
      case "FETCH":
        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
              email: true,
            },
          });
          const productFetch = await prisma.productFetch
            .findMany({
              where: {
                userId: user.id,
                productId: pid,
              },
            })
            .then((res) => res[0]);
          const fetching = await prisma.productFetch.update({
            where: {
              id: productFetch.id,
            },
            data: {
              status: "FETCHING",
            },
          });
          let count = 0;
          const interval = setInterval(async () => {
            const { status } = await prisma.productFetch
              .findMany({
                where: {
                  userId: user.id,
                  productId: pid,
                },
              })
              .then((res) => res[0]);
            if (status !== "FETCHING") {
              clearInterval(interval);
              console.log(status);
            } else {
              count++;
              console.log(count);
            }
          }, 1000);

          res.status(200).json("fetching");
        } catch (err) {
          res.status(500).json("not go though mongodb");
        }
        break;
      case "STOP":
        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
              email: true,
            },
          });
          const productFetch = await prisma.productFetch
            .findMany({
              where: {
                userId: user.id,
                productId: pid,
              },
            })
            .then((res) => res[0]);
          const fetching = await prisma.productFetch.update({
            where: {
              id: productFetch.id,
            },
            data: {
              status: "SUCCEEDED",
            },
          });
          res.status(200).json("stop");
        } catch (err) {
          res.status(500).json("not go though mongodb");
        }
        break;
      default:
        break;
    }
  });

export default handler;
