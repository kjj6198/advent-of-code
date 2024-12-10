function findTrailheadScores(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let totalScore = 0;

  // Find all trailheads (positions with height 0)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        const score = calculateTrailheadScore(grid, r, c);
        totalScore += score;
      }
    }
  }

  return totalScore;
}

function calculateTrailheadScore(grid, startR, startC) {
  const rows = grid.length;
  const cols = grid[0].length;

  const reachableNines = new Set();
  const visited = new Set();

  // DFS to find all reachable positions with height 9
  function dfs(r, c, currentHeight) {
    const key = `${r},${c}`;

    if (visited.has(key)) {
      return;
    }

    if (r >= rows || c >= cols || r < 0 || c < 0) {
      return;
    }

    const height = grid[r][c];

    if (height !== 0 && height !== currentHeight + 1) {
      return;
    }

    if (height === 0 && (r !== startR && c !== startC)) {
      return;
    }

    visited.add(key);
    if (height === 9) {
      reachableNines.add(key);

      return;
    }

    // Try all four directions
    dfs(r - 1, c, height); // up
    dfs(r + 1, c, height); // down
    dfs(r, c - 1, height); // left
    dfs(r, c + 1, height); // right
  }

  dfs(startR, startC, 0);
  return reachableNines.size;
}

export function part1(input) {
  // Parse input into a grid of numbers
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));

  return [findTrailheadScores(grid), input];
}

export function part2(input) {}
