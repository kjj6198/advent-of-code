function count(steps, stone, dp = new Map()) {
  if (dp.has(`${steps},${stone}`)) {
    return dp.get(`${steps},${stone}`);
  }

  if (steps == 0) return 1;

  if (stone == 0) return count(steps - 1, 1, dp);

  const c = stone.toString();
  const n = c.length;

  if (n % 2 == 0) {
    const s1 = parseInt(c.slice(0, n / 2));
    const s2 = parseInt(c.slice(n / 2));

    const sum = count(steps - 1, s1, dp) + count(steps - 1, s2, dp);
    dp.set(`${steps},${stone}`, sum);
    return sum;
  }

  return count(steps - 1, 2024 * stone, dp);
}

export function part1(input) {
  const lines = input.split(" ").map((x) => parseInt(x));
  const sum = lines.reduce((a, c) => a + count(25, c), 0);

  return [sum, lines];
}

export function part2(lines) {
  const sum = lines.reduce((a, c) => a + count(75, c), 0);

  return [sum];
}
