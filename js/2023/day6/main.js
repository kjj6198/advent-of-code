export function part1(input) {
  const lines = input.split("\n");
  const data = lines.map((line) => {
    const [_, values] = line.split(":");
    return values
      .trim()
      .split(" ")
      .filter((str) => str.trim() !== "")
      .map((n) => Number(n));
  });

  const [times, dis] = data;
  const records = [];

  // simple zip
  times.forEach((time, i) => {
    records.push([time, dis[i]]);
  });

  let sum = [];
  records.forEach((record) => {
    const [time, dis] = record;
    let win = 0;

    for (let i = 1; i < time; i++) {
      if ((time - i) * i > dis) {
        win++;
      }
    }
    sum.push(win);
  });

  return [sum.reduce((a, b) => a * b, 1), data];
}

export function part2(data) {
  const record = [
    Number(data[0].reduce((a, b) => a.toString() + b.toString(), "")),
    Number(data[1].reduce((a, b) => a.toString() + b.toString(), "")),
  ];
  const [time, dis] = record;
  let hold = 1;
  while (time - hold < dis / hold) {
    hold++;
  }

  const start = hold;
  const end = time - hold;
  return [end - start + 1];
}
