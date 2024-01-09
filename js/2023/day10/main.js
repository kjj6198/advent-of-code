class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function findStartPoint(array) {
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[0].length; x++) {
      const point = array[y][x];
      if (point === "S") {
        return [x, y];
      }
    }
  }
}

function clampFor(array) {
  return (num) => {
    const len = array.length;
    return Math.min(len, Math.max(num, 0));
  };
}
function determinePipe(array, x, y) {
  const possible = {
    N: false,
    E: false,
    S: false,
    W: false,
  };
  const direction = {
    "|": "NS",
    "-": "WE",
    L: "NE",
    J: "NW",
    7: "SW",
    F: "SE",
  };
  const clamp = clampFor(array);

  if (["|", "7", "F"].includes(array[clamp(y - 1)][x])) {
    possible.N = true;
  }
  if (["-", "J", "7"].includes(array[y][clamp(x + 1)])) {
    possible.E = true;
  }
  if (["|", "J", "L"].includes(array[clamp(y + 1)][x])) {
    possible.S = true;
  }
  if (["-", "L", "F"].includes(array[y][clamp(x - 1)])) {
    possible.W = true;
  }
  const dir = Object.keys(possible)
    .filter((key) => {
      return possible[key];
    })
    .reduce((a, b) => a + b, "");
  const target = Object.entries(direction).filter((entry) => {
    const [_, value] = entry;
    return value === dir || value === dir.split("").reverse().join("");
  });

  return target[0][0];
}

function printMap(input) {
  console.log(input.map((ii) => ii.join("")).join("\n"));
}

function print(input) {
  console.log(input.map((ii) => ii.join("")).join("\n"));
}

export function part1(input) {
  const map = input.split("\n").map((d) => d.split(""));
  const mapping = {
    N: new Vector(0, 1),
    S: new Vector(0, -1),
    E: new Vector(1, 0),
    W: new Vector(-1, 0),
  };

  const direction = {
    "|": "NS",
    "-": "WE",
    L: "NE",
    J: "NW",
    7: "SW",
    F: "SE",
  };
  const [startX, startY] = findStartPoint(map);
  const visited = new Set();
  const route = Array.from(new Array(map.length), () => new Array(map[0].length).fill("."));
  map[startY][startX] = determinePipe(map, startX, startY);
  route[startY][startX] = "S";

  let x = startX;
  let y = startY;
  visited.add(`${x},${y}`);
  let distance = 1;
  while (true) {
    const c = map[y][x];
    const up = c == "|" || c == "L" || c == "J";
    const down = c == "|" || c == "7" || c == "F";
    const left = c == "-" || c == "7" || c == "J";
    const right = c == "-" || c == "L" || c == "F";
    // console.log(c, up, down, left, right);
    if (up && !visited.has(`${x},${y - 1}`)) {
      y--;
      distance++;
      // console.log(c, x, y);
      route[y][x] = "X";
      visited.add(`${x},${y}`);
      continue;
    } else if (down && !visited.has(`${x},${y + 1}`)) {
      y++;
      route[y][x] = `X`;
      visited.add(`${x},${y}`);
      distance++;
      continue;
    } else if (left && !visited.has(`${x - 1},${y}`)) {
      x--;
      route[y][x] = `X`;
      distance++;
      visited.add(`${x},${y}`);
      continue;
    } else if (right && !visited.has(`${x + 1},${y}`)) {
      x++;
      route[y][x] = `X`;
      distance++;
      visited.add(`${x},${y}`);
      continue;
    }
    console.log(x, y, distance);

    break;
  }

  console.log("------------------------");
  print(route);
  return [distance / 2];
}
