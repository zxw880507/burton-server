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
    const email = "test1@burton.com";
    try {
      const user = prisma.user.findUnique({
        where: {
          email,
        },
      });
      const productFetchingList = prisma.productFetch.findMany({
        where: {
          userId: user.id,
        },
      });
      res.status(200).json(productFetchingList);
    } catch (err) {
      res.status(500).json({ errorMessage: "Fetching failed" });
    }
  });

export default handler;
