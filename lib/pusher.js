import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1295366",
  key: "216fe81b396e5f6f6a2a",
  secret: "e7aff54938b30e4c60db",
  cluster: "us3",
  useTLS: true,
});

export default pusher;
