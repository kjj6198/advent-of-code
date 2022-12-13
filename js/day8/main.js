function countVisible(arr, x, y) {
  const curr = arr[y][x];

  let top = 0;
  let right = 0;
  let left = 0;
  let bottom = 0;

  for (let i = y - 1; i >= 0; i--) {
    if (i === 0) {
      top++;
      break;
    }
    if (curr === arr[i][x]) {
      top++;
      break;
    }
    if (curr > arr[i][x]) {
      top++;
    } else {
      break;
    }
  }

  // bottom
  for (let i = y + 1; i < arr.length; i++) {
    if (i === arr.length - 1) {
      bottom++;
      break;
    }
    if (curr === arr[i][x]) {
      bottom++;
      break;
    }

    if (curr > arr[i][x]) {
      bottom++;
    } else {
      break;
    }
  }

  // right
  for (let i = x + 1; i < arr[0].length; i++) {
    if (i === arr[0].length - 1) {
      right++;
      break;
    }
    if (curr === arr[y][i]) {
      right++;
      break;
    }
    if (curr > arr[y][i]) {
      right++;
    } else {
      break;
    }
  }

  // left
  for (let i = x - 1; i >= 0; i--) {
    if (i === 0) {
      left++;
      break;
    }
    if (curr === arr[y][i]) {
      left++;
      break;
    }
    if (curr > arr[y][i]) {
      left++;
    } else {
      break;
    }
  }

  return top * bottom * right * left;
}

function findVisible(arr, x, y, direction) {
  const curr = arr[y][x];

  const result = [];
  if (direction === "top") {
    for (let i = y - 1; i >= 0; i--) {
      result.push(arr[i][x]);
    }

    return result.every((v) => v < curr);
  } else if (direction === "bottom") {
    for (let i = y + 1; i < arr.length; i++) {
      result.push(arr[i][x]);
    }
    return result.every((v) => v < curr);
  } else if (direction === "right") {
    for (let i = x + 1; i < arr[0].length; i++) {
      result.push(arr[y][i]);
    }

    return result.every((v) => v < curr);
  } else {
    for (let i = x - 1; i >= 0; i--) {
      result.push(arr[y][i]);
    }

    return result.every((v) => v < curr);
  }

  // right
  // bottom
  // left
}

export function part1(input) {
  const trees = input.split("\n");
  const m = trees.length;
  const n = trees[0].length;
  const edge = 2 * m + 2 * n - 4;
  let count = 0;
  const allTree = Array.from({ length: m }).map((_, i) =>
    trees[i].split("").map((n) => Number(n))
  );
  for (let y = 1; y < m - 1; y++) {
    for (let x = 1; x < n - 1; x++) {
      if (findVisible(allTree, x, y, "top")) {
        count++;
      } else if (findVisible(allTree, x, y, "right")) {
        count++;
      } else if (findVisible(allTree, x, y, "bottom")) {
        count++;
      } else if (findVisible(allTree, x, y, "left")) {
        count++;
      }
    }
  }

  return [count + edge, allTree];
}

export function part2(allTree) {
  const m = allTree.length;
  const n = allTree[0].length;
  const result = [];
  for (let y = 1; y < m - 1; y++) {
    for (let x = 1; x < n - 1; x++) {
      result.push(countVisible(allTree, x, y));
    }
  }

  return Math.max(...result);
}
