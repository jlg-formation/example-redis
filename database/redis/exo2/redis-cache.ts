import axios from "axios";
import { createClient } from "redis";

const clientRO = createClient({
  url: process.env.REDIS_RO_URL ?? "redis://localhost:6379",
});

const clientWO = createClient({
  url: process.env.REDIS_WO_URL ?? "redis://localhost:6379",
});

(async () => {
  try {
    clientRO.on("error", (err) => console.log("Redis Client Error", err));
    await clientRO.connect();
    clientWO.on("error", (err) => console.log("Redis Client Error", err));
    await clientWO.connect();
  } catch (err) {
    console.log("err: ", err);
  }
})();

export const redisAxios = async (url) => {
  const cache = await clientRO.get(url);
  if (cache === null) {
    console.log("Cache MISS");
    const response = await axios(url);
    const data = response.data;
    await clientWO.set(url, JSON.stringify(data), {
      EX: 30,
    });
    return data;
  }
  return JSON.parse(cache);
};
