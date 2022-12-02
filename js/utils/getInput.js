import https from "https";

export default function getInput(year = 2022, day) {
  const data = [];
  return new Promise((resolve) => {
    const target = new URL(
      `/${year}/day/${day.replace("day", "")}/input`,
      `https://adventofcode.com`
    );

    const req = https.request(
      {
        host: target.host,
        path: target.pathname,
        pathname: target.pathname,
        headers: {
          Cookie: `session=${process.env.SESSION_ID}`,
        },
      },
      (res) => {
        res.on("data", (chunk) => {
          data.push(chunk);
        });
        res.on("error", (d) => console.log(d.toString()));

        res.on("end", () => {
          resolve(Buffer.concat(data));
        });
      }
    );

    console.log(req.path);
    req.on("error", (d) => console.log(d.toString()));
    req.end();
  });
}
