import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { email, password, repassword } = req.body;
  const errorMessage = {};
  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exist) {
    console.log("email err");
    errorMessage.email = "Email Address is Already Registered";
  }
  if (!/^[a-zA-Z0-9]{6,10}$/.test(password)) {
    console.log("password err");
    errorMessage.password =
      "Password must be between six and ten characters long\nCan only contain any letters a to z and/or any numbers from 0 through 9";
  }
  if (password !== repassword) {
    console.log("repassword err");
    errorMessage.repassword = "Password and confirm password does not match";
  }
  if (Object.keys(errorMessage).length) {
    console.log("overall error");
    res.status(500).json({ errorMessage });
  } else {
    try {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await prisma.user.create({
        data: {
          email,
          hash,
        },
        select: {
          id: true,
          email: true,
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(200).json({
        errorMessage: { general: "Failed to register due to server" },
      });
    }
  }
}