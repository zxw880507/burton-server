import nc from "next-connect";
import cors from "cors";
import { prisma } from "../../../lib/prisma";
// import { dataReformat } from "../../../utils/helpers";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const { action, fetchId } = req.query;
    const actionSerialize = JSON.parse(action);

    switch (actionSerialize.type) {
      case "FETCH":
        try {
          await prisma.productFetch.update({
            where: {
              id: fetchId,
            },
            data: {
              status: "FETCHING",
            },
          });

          let count = 0;
          const interval = setInterval(async () => {
            const { status } = await prisma.productFetch.findUnique({
              where: {
                id: fetchId,
              },
            });
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
          await prisma.productFetch.update({
            where: {
              id: fetchId,
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
