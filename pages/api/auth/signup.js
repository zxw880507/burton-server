import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
  const { email, password, repassword } = req.body;
  const errorMessage = {};
  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exist) {
    errorMessage.email = "Email Address is Already Registered";
  }
  if (!/^[a-zA-Z0-9]{6,10}$/.test(password)) {
    errorMessage.password =
      "Password must be between six and ten characters long\nCan only contain any letters a to z and/or any numbers from 0 through 9";
  }
  if (password !== repassword) {
    errorMessage.repassword = "Password and confirm password does not match";
  }
  if (Object.keys(errorMessage).length) {
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
      req.session.user = newUser;
      await req.session.save();
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(200).json({
        errorMessage: { general: "Failed to register due to server" },
      });
    }
  }
});
