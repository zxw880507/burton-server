import nc from "next-connect";
import cors from "cors";
import { prisma } from "../../../lib/prisma";
// import { dataReformat } from "../../../utils/helpers";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const { userId } = req.query;
    try {
      const productFetchingList = await prisma.productFetch.findMany({
        where: {
          userId,
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
    const { userId } = req.query;
    const { fetchForm } = req.body;
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
  .put(async (req, res) => {
    const { fetchForm, id } = req.body;
    try {
      const updatedFetch = await prisma.productFetch.update({
        where: {
          id,
        },
        data: fetchForm,
      });
      res.status(200).json(updatedFetch);
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: `Failed to update the fetch` });
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
