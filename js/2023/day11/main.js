function isIntersect(p1, p2, lines, offset = 2) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  return lines.map((line) => {
    let xx = false;
    let yy = false;

    if (typeof line.x !== "undefined") {
      if (Math.min(x1, x2) <= line.x && Math.max(x1, x2) >= line.x) {
        xx = true;
      }
    }

    if (typeof line.y !== "undefined") {
      if (Math.min(y1, y2) <= line.y && Math.max(y1, y2) >= line.y) {
        yy = true;
      }
    }
    return { x: xx, y: yy, offset: offset - 1 };
  });
}

function searchGravitationalEffects(array) {
  const cols = array.length;
  const rows = array[0].length;
  const empty = [];
  for (let y = 0; y < cols; y++) {
    const row = array[y];
    if (row.every((r) => r === ".")) {
      empty.push({ y });
    }
  }

  for (let x = 0; x < rows; x++) {
    const result = [];
    for (let y = 0; y < cols; y++) {
      result.push(array[y][x]);
    }
    if (result.every((r) => r === ".")) {
      empty.push({ x });
    }
  }
  return empty;
}

export function part1(input) {
  const data = input.split("\n").map((line) => line.split(""));
  const empty = searchGravitationalEffects(data);
  const galaxies = [];
  const cols = data.length;
  const rows = data[0].length;

  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      const curr = data[y][x];
      if (curr === "#") {
        galaxies.push([x, y]);
      }
    }
  }

  let sum = 0;

  while (galaxies.length > 0) {
    let current = galaxies.reverse().pop();
    for (let i = 0; i < galaxies.length; i++) {
      const result = isIntersect(galaxies[i], current, empty);
      let dis = Math.abs(galaxies[i][0] - current[0]) + Math.abs(galaxies[i][1] - current[1]);
      result.forEach((r) => {
        if (r.x) dis += r.offset;
        if (r.y) dis += r.offset;
      });
      sum += dis;
    }
  }
  return [sum, [data, empty]];
}

export function part2(result) {
  const [data, empty] = result;
  const galaxies = [];
  const cols = data.length;
  const rows = data[0].length;

  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      const curr = data[y][x];
      if (curr === "#") {
        galaxies.push([x, y]);
      }
    }
  }

  let sum = 0;

  while (galaxies.length > 0) {
    let current = galaxies.reverse().pop();
    for (let i = 0; i < galaxies.length; i++) {
      const result = isIntersect(galaxies[i], current, empty, 1_000_000);
      let dis = Math.abs(galaxies[i][0] - current[0]) + Math.abs(galaxies[i][1] - current[1]);
      result.forEach((r) => {
        if (r.x) dis += r.offset;
        if (r.y) dis += r.offset;
      });
      sum += dis;
    }
  }
  return [sum];
}
