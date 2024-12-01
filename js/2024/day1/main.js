export function part1(data) {
  const lines = data.split("\n");
  let left = [];
  let right = [];

  lines.forEach((line) => {
    const [a, b] = line.split("   ");
    left.push(Number(a));
    right.push(Number(b));
  });

  left.sort((a, b) => b - a);
  right.sort((a, b) => b - a);

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    const diff = Math.abs(left[i] - right[i]);
    sum += diff;
  }

  return [sum, [left, right]];
}

export function part2(data) {
  const [left, right] = data;
  const score = new Map();

  for (let i = 0; i < right.length; i++) {
    score.set(right[i], score.has(right[i]) ? score.get(right[i]) + 1 : 1);
  }

  const sum = left.reduce((acc, l) => {
    const s = score.get(l);
    return acc + l * (s || 0);
  }, 0);
  return [sum];
}
