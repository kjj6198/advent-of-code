class Range {
  constructor(from, to) {
    this.from = Number(from);
    this.to = Number(to);
  }

  contains(range) {
    return this.from >= range.from && this.to <= range.to;
  }

  isOverlapped(range) {
    return !(this.to < range.from || this.from > range.to);
  }
}
export function part1(input) {
  const ranges = input.split("\n");
  let count = 0;

  ranges.forEach((ra) => {
    const [r1, r2] = ra.split(",");
    const [from1, to1] = r1.split("-");
    const [from2, to2] = r2.split("-");
    const range1 = new Range(from1, to1);
    const range2 = new Range(from2, to2);
    if (range1.contains(range2) || range2.contains(range1)) {
      count += 1;
    }
  });
  return [count, ranges];
}

export function part2(input) {
  let count = 0;

  input.forEach((ra) => {
    const [r1, r2] = ra.split(",");
    const [from1, to1] = r1.split("-");
    const [from2, to2] = r2.split("-");
    const range1 = new Range(from1, to1);
    const range2 = new Range(from2, to2);
    if (range1.isOverlapped(range2) || range2.isOverlapped(range1)) {
      count += 1;
    }
  });
  return [count];
}
