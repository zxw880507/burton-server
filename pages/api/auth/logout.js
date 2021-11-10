import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).send(null);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Log out failed due to server" });
  }
});
