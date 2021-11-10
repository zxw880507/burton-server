import Pusher from "pusher-js";

Pusher.logToConsole = process.env.NODE_ENV !== "production";
const pusher = new Pusher("216fe81b396e5f6f6a2a", {
  cluster: "us3",
});

const channel = pusher.subscribe("my-channel");

export default channel;
