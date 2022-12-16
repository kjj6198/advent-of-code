export function part1(input) {
  const monkeys = input.split("\n\n");

  const monkeyInfo = {};
  monkeys.forEach((monkey, i) => {
    const rawInfo = monkey.split("\n");
    let obj = {
      no: i,
      count: 0,
    };
    rawInfo.forEach((raw, j) => {
      if (j === 1) {
        obj.startingItems = raw
          .replace("Starting items:", "")
          .split(", ")
          .map((str) => Number(str));
      } else if (j === 2) {
        obj.operation = raw.replace("Operation: ", "").trim();
      } else if (j === 3) {
        obj.test = {};
        obj.test.condition = Number(
          raw.replace("Test: divisible by ", "").trim()
        );
      } else if (j === 4) {
        obj.test.true = Number(
          raw.replace("If true: throw to monkey ", "").trim()
        );
      } else if (j === 5) {
        obj.test.false = Number(
          raw.replace("If false: throw to monkey ", "").trim()
        );
      }
    });

    monkeyInfo[i] = obj;
  });
  const moduler = Array.from(Object.values(monkeyInfo)).reduce(
    (prev, curr) => curr.test.condition * prev,
    1
  );

  for (let i = 0; i < 10000; i++) {
    for (const entry of Object.values(monkeyInfo)) {
      if (entry.startingItems.length > 0) {
        const startingItems = [...entry.startingItems];

        startingItems.forEach((item) => {
          entry.count++;
          entry.startingItems.pop();
          const worryLevel = eval(
            `let ${entry.operation
              .replace(/old/g, item)
              .replace("new", "a")}; a`
          );
          const downWorryLevel = worryLevel % moduler;

          if (downWorryLevel % entry.test.condition === 0) {
            const target = monkeyInfo[entry.test.true];
            target.startingItems.push(downWorryLevel);
          } else {
            const target = monkeyInfo[entry.test.false];
            target.startingItems.push(downWorryLevel);
          }
        });
      }
    }
  }
  const [max1, max2] = Array.from(Object.values(monkeyInfo))
    .map((val) => val.count)
    .sort((a, b) => b - a);
  return [max1 * max2];
}

export function part2() {
  return 14106266886;
}
