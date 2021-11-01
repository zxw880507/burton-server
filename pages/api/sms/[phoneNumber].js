require("dotenv").config();
import nc from "next-connect";
import cors from "cors";
import twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const handler = nc()
  // use connect based middleware
  .use(cors())
  .post((req, res) => {
    const { phoneNumber } = req.query;
    const { msg } = req.body;

    client.messages
      .create({
        to: `+1${phoneNumber}`,
        from: twilioNumber,
        body: msg,
      })
      .then((message) => {
        res.status(200).json("message sent");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errorMessage: `message sent failed` });
      });
  });

export default handler;
