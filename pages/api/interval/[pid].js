import nc from "next-connect";
import cors from "cors";
import { dataReformat } from "../../../utils/helpers";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const { pid, interval, action } = req.query;
    const actionSerialize = JSON.parse(action);
    switch (actionSerialize.type) {
      case "FETCH":
        const intervalFetching = setInterval(
          () => console.log(pid, interval),
          1000
        );
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
