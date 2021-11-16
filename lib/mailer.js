require("dotenv").config();
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

const sendEmail = async (demand, email) => {
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
  try {
    await transporter.sendMail(mailData);
  } catch (err) {
    return Promise.reject({
      status: 400,
      message: `failed to send email to ${email}`,
    });
  }
};

export default sendEmail;
