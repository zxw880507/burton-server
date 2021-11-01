import nc from "next-connect";
import cors from "cors";
import axios from "axios";
import { dataReformat, sortDemand, isAvailable } from "../../../utils/helpers";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .post(async (req, res) => {
    const { pid } = req.query;
    const { form } = req.body;

    try {
      const response = await axios(
        `https://www.burton.com/on/demandware.store/Sites-Burton_NA-Site/en_CA/Product-GetVariationJSON?pid=${pid}`
      );
      const productArray = dataReformat(
        response.data.data.variations.variationValues
      );
      const sortByForm = sortDemand(productArray, form);
      const data = isAvailable(sortByForm);
      if (data.length) {
        res.status(200).json(data);
      } else {
        res
          .status(500)
          .json({ errorMessage: "Products currently are unavailable!" });
      }
    } catch (error) {
      res.status(500).send({ errorMessage: `Can not find product by ${pid}` });
    }
  });

export default handler;
