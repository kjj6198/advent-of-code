const symbols = /[^\d\.]/;

function findSymbol(arr, x, y, reg = symbols) {
  const row = arr[0].length;
  const col = arr.length;
  if (x < 0) {
    x = 0;
  } else if (x >= row) {
    x = row - 1;
  }
  if (y < 0) {
    y = 0;
  } else if (y >= col) {
    y = col - 1;
  }

  return reg.test(arr[y][x]);
}

function findAdjacentHasSymbol(arr, x, y, reg = symbols) {
  return (
    findSymbol(arr, x - 1, y, reg) ||
    findSymbol(arr, x + 1, y, reg) ||
    findSymbol(arr, x, y + 1, reg) ||
    findSymbol(arr, x, y - 1, reg) ||
    findSymbol(arr, x - 1, y - 1, reg) ||
    findSymbol(arr, x - 1, y + 1, reg) ||
    findSymbol(arr, x + 1, y - 1, reg) ||
    findSymbol(arr, x + 1, y + 1, reg)
  );
}

function findAdjacentMap(arr, x, y, reg = symbols) {
  const position = [
    [x - 1, y, findSymbol(arr, x - 1, y, reg)],
    [x + 1, y, findSymbol(arr, x + 1, y, reg)],
    [x, y + 1, findSymbol(arr, x, y + 1, reg)],
    [x, y - 1, findSymbol(arr, x, y - 1, reg)],
    [x - 1, y - 1, findSymbol(arr, x - 1, y - 1, reg)],
    [x - 1, y + 1, findSymbol(arr, x - 1, y + 1, reg)],
    [x + 1, y - 1, findSymbol(arr, x + 1, y - 1, reg)],
    [x + 1, y + 1, findSymbol(arr, x + 1, y + 1, reg)],
  ].find((positions) => positions[2] === true);

  return position;
}

export function part1(data) {
  const schematic = data.split("\n").map((line) => line.split(""));
  const y = schematic.length;
  const x = schematic[0].length;
  const nums = new Map();
  let num = "";
  let parsing = false;
  for (let j = 0; j < y; j++) {
    for (let i = 0; i < x; i++) {
      const ch = schematic[j][i];
      if (/\d/.test(ch)) {
        parsing = true;
        num += ch;
      } else {
        if (parsing) {
          nums.set(`${i - num.length},${j}`, { value: num });
          parsing = false;
          num = "";
        }
      }
    }
    if (parsing) {
      nums.set(`${x - num.length},${j}`, { value: num });

      parsing = false;
      num = "";
    }
  }

  const sum = Array.from(nums.entries())
    .filter((entry) => {
      const [index, { value }] = entry;
      let [x, y] = index.split(",");
      x = Number(x);
      y = Number(y);

      let result = false;
      for (let i = 0; i < value.length; i++) {
        result = findAdjacentHasSymbol(schematic, x + i, y);
        if (result) {
          return true;
        }
      }

      return false;
    })
    .map((entry) => {
      console.log(entry[1].value);
      return Number(entry[1].value);
    })
    .reduce((value, curr) => value + curr, 0);

  return [sum, [schematic, Array.from(nums.entries())]];
}

export function part2(result) {
  const [schematic, nums] = result;

  const map = {};
  nums.forEach((entry) => {
    const [index, { value }] = entry;
    let [x, y] = index.split(",");
    x = Number(x);
    y = Number(y);
    for (let i = 0; i < value.length; i++) {
      const adjacentMap = findAdjacentMap(schematic, x + i, y, /\*/);
      if (adjacentMap) {
        map[`${adjacentMap[0]},${adjacentMap[1]}`] = (
          map[`${adjacentMap[0]},${adjacentMap[1]}`] || []
        ).concat(Number(value));
        break;
      }
    }
  });
  return Object.values(map)
    .map((gear) => (gear.length > 1 ? gear.reduce((a, b) => a * b, 1) : 0))
    .reduce((a, b) => a + b, 0);
}
