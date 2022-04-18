import { createClient } from "redis";

const n = 10000;
const min = 10;
const max = 20;

const random = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

(async () => {
  const client = createClient();

  client.on("error", (err) => console.log("Redis Client Error", err));

  {
    console.time("redis");
    await client.connect();
    await client.flushAll();
    for (let i = 0; i < n; i++) {
      const r = random(1, 100);
      await client.zAdd("mySortedSet", [
        {
          score: r,
          value: "user" + i,
        },
      ]);
    }
    const data = await client.zRangeWithScores("mySortedSet", min, max, {
      BY: "SCORE",
    });
    await client.disconnect();
    console.timeEnd("redis");
  }

  {
    console.time("js");
    const map = new Map();
    for (let i = 0; i < n; i++) {
      map.set("user" + i, random(1, 100));
    }
    const data = [...map.entries()].filter(
      ([key, value]) => value <= max && value >= min
    );
    console.timeEnd("js");
  }
})();
