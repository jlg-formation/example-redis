import connectRedis from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

const RedisStore = connectRedis(session);
const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
  legacyMode: true,
});
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to redis successfully");
  } catch (err) {
    console.log("err: ", err);
  }
})();

export const redisSession = session({
  name: "example-redis.sid",
  secret: "do not change this secret or all session will be reset...",
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
});
