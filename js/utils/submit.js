import https from "https";

export default function sumbit(year = 2022, day, part, answer) {
  const data = [];
  return new Promise((resolve) => {
    const target = new URL(
      `/${year}/day/${day}/answer`,
      `https://adventofcode.com`
    );

    const data = {
      level: part,
      answer,
    };
    const params = new URLSearchParams(data).toString();
    const req = https.request(
      {
        host: target.host,
        path: target.pathname,
        pathname: target.pathname,
        method: "POST",
        headers: {
          Cookie: `session=${process.env.SESSION_ID}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(params),
        },
      },
      (res) => {
        const data = [];
        res.on("data", (chunk) => {
          data.push(chunk);
        });
        res.on("error", (d) => console.log(d.toString()));

        res.on("end", () => {
          resolve(Buffer.concat(data));
        });
      }
    );

    req.on("error", (d) => console.log(d.toString()));
    req.write(params);
    req.end();
  });
}
