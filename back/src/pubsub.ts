import ws from "ws";
import { AccountService } from "./AccountService";
import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

export const pubsub = (wss: ws.Server) => {
  (async () => {
    try {
      const subscriber = redisClient.duplicate();
      await subscriber.connect();
      console.log("subscriber connected to Redis");

      await subscriber.subscribe("accounts", (message) => {
        try {
          console.log("message from accounts channel:", message);
          const accountService = new AccountService(wss);
          accountService.sendAccounts();
        } catch (err) {
          console.log("err: ", err);
        }
      });
      console.log("subscriber listening for accounts channel");
    } catch (err) {
      console.log("err: ", err);
    }
  })();
};
