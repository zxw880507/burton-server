import { withIronSessionApiRoute } from "iron-session/next";

const withSession = (handler) =>
  withIronSessionApiRoute(handler, {
    password:
      process.env.SECRET_COOKIE_PASSWORD ||
      "complex_password_at_least_32_characters_long",
    cookieName: "bstock_user",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  });

export default withSession;
