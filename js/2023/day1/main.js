const numMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export function part1(data) {
  let sum = 0;
  data = data.split("\n");
  data.forEach((d) => {
    const checksum = d.replace(/\D/g, "");
    if (checksum.length === 1) {
      sum += parseInt(`${checksum}${checksum}`, 10);
      return;
    }

    sum += parseInt(`${checksum[0]}${checksum.slice(-1)[0]}`, 10);
  });

  return [sum, data];
}

export function part2(data) {
  let sum = 0;
  const reg = /((?:\d|one|two|three|four|five|six|seven|eight|nine))/g;

  data.forEach((row) => {
    const matches = row.match(reg);
    const firstNumber = matches[0];

    const first = numMap[firstNumber] || firstNumber;

    let lastNumber = false;
    let count = -1;

    while (lastNumber === false) {
      const testString = row.slice(count);
      if (testString.match(reg)) {
        lastNumber = testString.match(reg)[0];
      }
      count--;
    }

    const last = numMap[lastNumber] || lastNumber;
    sum += parseInt(`${first}${last}`);
  });

  return sum;
}
