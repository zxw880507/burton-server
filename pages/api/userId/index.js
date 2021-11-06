import nc from "next-connect";
import cors from "cors";
import { prisma } from "../../../lib/prisma";
// import { dataReformat } from "../../../utils/helpers";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const email = "test1@burton.com";
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      const productFetchingList = await prisma.productFetch.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      res.status(200).json(productFetchingList);
    } catch (err) {
      res.status(500).json({ errorMessage: "Fetching failed" });
    }
  })
  .post(async (req, res) => {
    const { fetchForm } = req.body;
    const userId = "6185977eac1583b1d33d1f4a";
    try {
      const newFetch = await prisma.productFetch.create({
        data: {
          status: "IDLE",
          userId,
          ...fetchForm,
        },
      });
      res.status(200).json(newFetch);
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: `Failed to create a new fetch` });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.body;
    try {
      const deletedFetch = await prisma.productFetch.delete({
        where: {
          id,
        },
      });
      res.status(200).json(deletedFetch);
    } catch (err) {
      res.status(500).json({ errorMessage: `Failed to delete fetch ${id}` });
    }
  });

export default handler;
