import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
  switch (req.method) {
    case "POST":
      {
        const { email, password } = req.body;
        const errorMessage = {};
        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!user) {
            errorMessage.email =
              "The email account that you tried to reach does not exist";
            res.status(500).json({ errorMessage });
          } else {
            const checkPassword = bcrypt.compareSync(password, user.hash);
            if (!checkPassword) {
              errorMessage.password = "The password is incorrect";
              res.status(500).json({ errorMessage });
            } else {
              const userSelected = { id: user.id, email: user.email };
              req.session.user = userSelected;
              await req.session.save();
              res.status(200).json(userSelected);
            }
          }
        } catch (error) {
          res.status(500).json({
            errorMessage: { general: "Failed to login due to server" },
          });
        }
      }
      break;
    case "GET":
      {
        const { user } = req.session;
        if (user) {
          try {
            const userChecked = await prisma.user.findUnique({
              where: {
                id: user.id,
              },
              select: {
                id: true,
                email: true,
              },
            });
            if (userChecked) {
              res.status(200).json(userChecked);
            } else {
              res
                .status(500)
                .json({ errorMessage: "User in session does not exist" });
            }
          } catch (error) {
            res
              .status(500)
              .json({ errorMessage: "Failed to login due to server" });
          }
        } else {
          res.status(500).json({ errorMessage: "Please login/signup first" });
        }
      }
      break;
    default:
      break;
  }
});
