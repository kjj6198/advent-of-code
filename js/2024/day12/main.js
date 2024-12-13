// main concept from
// https://www.reddit.com/r/adventofcode/comments/1h4ncyr/2024_day_12_solutions/

function exploreRegion(map, i, j, explored) {
  if (explored.has(`${i},${j}`)) {
    return [0, new Set()];
  }
  const plant = map[i][j];
  let territory = 0;
  const boundaries = new Set();
  const n = map.length;
  const m = map[0].length;

  function explore(i, j) {
    const point = `${i},${j}`;
    if (explored.has(point)) {
      return;
    }
    explored.add(point);
    territory += 1;
    for (const [i2, j2] of [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ]) {
      if (i2 >= 0 && i2 < n && j2 >= 0 && j2 < m && map[i2][j2] === plant) {
        explore(i2, j2);
      } else {
        boundaries.add(`${i},${j},${i2},${j2}`);
      }
    }
  }

  explore(i, j);
  return [territory, boundaries];
}

function countBoundarySides(boundaries) {
  const explored = new Set();

  function exploreBoundarySide(...side) {
    if (explored.has(side.join(",")) || !boundaries.has(side.join(","))) {
      return;
    }
    explored.add(side.join(","));
    const [i, j, i2, j2] = side;
    if (i === i2) {
      exploreBoundarySide(i - 1, j, i2 - 1, j2);
      exploreBoundarySide(i + 1, j, i2 + 1, j2);
    } else {
      exploreBoundarySide(i, j - 1, i2, j2 - 1);
      exploreBoundarySide(i, j + 1, i2, j2 + 1);
    }
  }

  let boundarySides = 0;
  for (const side of boundaries) {
    if (explored.has(side)) {
      continue;
    }
    boundarySides += 1;
    exploreBoundarySide(...side.split(",").map(Number));
  }
  return boundarySides;
}

export function part1(input) {
  const map = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const n = map.length;
  const m = map[0].length;
  const explored = new Set();

  let score = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (explored.has(`${i},${j}`)) {
        continue;
      }
      const [territory, boundaries] = exploreRegion(map, i, j, explored);
      score += territory * boundaries.size;
    }
  }

  return [score, map];
}

export function part2(map) {
  const n = map.length;
  const m = map[0].length;
  const explored = new Set();

  let score = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (explored.has(`${i},${j}`)) {
        continue;
      }
      const [territory, boundaries] = exploreRegion(map, i, j, explored);
      score += territory * countBoundarySides(boundaries);
    }
  }

  return [score];
}
