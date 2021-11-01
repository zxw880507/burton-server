import nc from "next-connect";
import cors from "cors";
import axios from "axios";
import { dataReformat } from "../../utils/helpers";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const { pid } = req.query;
    try {
      const response = await axios(
        `https://www.burton.com/on/demandware.store/Sites-Burton_NA-Site/en_CA/Product-GetVariationJSON?pid=${pid}`
      );
      const data = dataReformat(response.data.data.variations.variationValues);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).send({ errorMessage: `Can not find product by ${pid}` });
    }
  });

export default handler;
