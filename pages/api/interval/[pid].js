import nc from "next-connect";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import { dataReformat } from "../../../utils/helpers";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const { pid, interval, action } = req.query;
    const actionSerialize = JSON.parse(action);
    const email = "test1@burton.com";
    switch (actionSerialize.type) {
      case "FETCH":
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            email,
          },
        });

        res.status(200).json("fetching");
        break;
      case "STOP":
        clearInterval(intervalFetching);
        console.log("interval cleared");
        res.status(200).json("stop");
        break;
      default:
        break;
    }
  });

export default handler;
