import { readFileSync } from "fs";
import path from "path";
import getInput from "./utils/getInput.js";
import sumbit from "./utils/submit.js";

async function exec() {
  const mode = process.argv[2];
  const day = process.argv[3];
  const dayPath = path.join(process.cwd(), `${day}`);
  try {
    const { part1: fn } = await import(path.join(dayPath, `main.js`));
    const { part2: fn2 } = await import(path.join(dayPath, `main.js`));
    let input = "";
    if (mode === "test") {
      input = readFileSync(
        mode === "test"
          ? path.join(dayPath, "test.txt")
          : path.join(dayPath, "input.txt")
      ).toString("utf-8");
    } else {
      input = await getInput(2022, 1).then((data) => data.toString());
    }

    const [answer, computed] = fn(input);

    console.log(`part1: ${answer}`);
    console.log(`part2: ${fn2(computed)}`);
    if (mode === "submit") {
      const res = await sumbit(2021, 1, 1, answer);
      console.log(res.toString());
    }
  } catch (e) {
    console.error(e);
  }
}

exec();
