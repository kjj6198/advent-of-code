import { readFileSync } from "fs";
import path from "path";
import getInput from "./utils/getInput.js";

async function exec() {
  const year = new Date().getFullYear().toString();
  const mode = process.argv[2];
  const day = process.argv[3];
  const part = process.argv[4];
  const dayPath = path.join(process.cwd(), year, `${day}`);
  try {
    const { part1: fn, part2: fn2 } = await import(path.join(dayPath, `main.js`));
    let input = "";
    if (mode === "test") {
      input = readFileSync(
        mode === "test" ? path.join(dayPath, "test.txt") : path.join(dayPath, "input.txt"),
      )
        .toString("utf-8")
        .trim();
    } else if (mode === "input") {
      input = readFileSync(
        mode === "test" ? path.join(dayPath, "test.txt") : path.join(dayPath, "input.txt"),
      )
        .toString("utf-8")
        .trim();
    } else {
      input = await getInput(year, day).then((data) => data.toString().trim());
    }

    if (fn || fn2) {
      console.time("part1 computed");
      const result = typeof fn === "function" && fn(input);
      if (result && part === "1") {
        console.log(`part1: ${result[0]}`);
        console.timeEnd("part1 computed");
      }

      if (fn2 && part === "2") {
        console.time("part2 computed");
        console.log(`part2: ${fn2(result[1])}`);
        console.timeEnd("part2 computed");
      }
    }
  } catch (e) {
    console.error(e);
  }
}

exec();
