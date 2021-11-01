require("dotenv").config();
import nc from "next-connect";
import cors from "cors";
import path from "path";
import ejs from "ejs";
import nodemailer from "nodemailer";

const emailServer = process.env.EMAIL_ADDRESS;

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: emailServer,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

const handler = nc()
  // use connect based middleware
  .use(cors())
  .post(async (req, res) => {
    const { email } = req.query;
    const { demand } = req.body;

    try {
      const postsDir = path.join(process.cwd(), "posts");
      const htmlTemplate = await ejs.renderFile(postsDir + "/result.ejs", {
        demand,
      });

      const mailData = {
        from: emailServer,
        to: email,
        subject: `Message From BurtonStock`,
        text: htmlTemplate,
        html: htmlTemplate,
      };

      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          res.status(500).send({ errorMessage: `message sent failed` });
        } else {
          res.status(200).json("message sent");
        }
      });
    } catch (error) {
      console.log(err);
      res.status(500).send({ errorMessage: `message sent failed` });
    }
  });

export default handler;
