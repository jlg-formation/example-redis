import axios from "axios";
import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379",
});

(async () => {
  try {
    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();
  } catch (err) {
    console.log("err: ", err);
  }
})();

export const redisAxios = async (url) => {
  const cache = await client.get(url);
  if (cache === null) {
    console.log("Cache MISS");
    const response = await axios(url);
    const data = response.data;
    await client.set(url, JSON.stringify(data), {
      EX: 30,
    });
    return data;
  }
  return JSON.parse(cache);
};
