import http from "node:http";
import { parse } from "csv-parse";
import fs from "fs";

(async () => {
  const csvPath = new URL("../../tasks.csv", import.meta.url);
  const parser = fs
    .createReadStream(csvPath)
    .pipe(parse({ delimiter: ";", from_line: 2 }));

  process.stdout.write("start\n");

  for await (const record of parser) {
    const postData = JSON.stringify({
      title: record[0],
      description: record[1],
    });

    const options = {
      hostname: "localhost",
      port: process.env.port || 3002,
      path: "/tasks",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on("end", () => {
        console.log("No more data in response.");
      });
    });

    req.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
  }

  process.stdout.write("...done\n");
})();
