require("dotenv").config();
import twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const sendMsg = async (msg, phoneNumber) => {
  try {
    await client.messages.create({
      to: `+1${phoneNumber}`,
      from: twilioNumber,
      body: msg,
    });
  } catch (err) {
    return Promise.reject({
      status: 400,
      message: `failed to send msg to ${phoneNumber}`,
    });
  }
};

export default sendMsg;
