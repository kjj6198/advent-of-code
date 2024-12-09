function processInput(input, length = 140) {
  const lines = input.split("\n");
  let gridStart = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length === length && lines[i].match(/^[XMAS]+$/)) {
      gridStart = i;
      break;
    }
  }

  // Extract the 10x10 grid
  const grid = lines
    .slice(gridStart, gridStart + length)
    .map((line) => line.trim())
    .filter((line) => line.length === length);

  return grid;
}

function findAllXMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

	
  // Create position maps for each letter
  const letterPositions = {
    M: new Set(),
    A: new Set(),
    S: new Set(),
  };

  // Precompute positions for each letter
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const char = grid[row][col];
      if (letterPositions.hasOwnProperty(char)) {
        letterPositions[char].add(`${row},${col}`);
      }
    }
  }

  // All possible directions
  const directions = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  const directions2 = [
    // m        s         m      s
    [-1, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
  ];

  // Only start from X positions and check if subsequent letters exist
  for (let pos of letterPositions["A"]) {
    const [row, col] = pos.split(",").map(Number);
	
    const pos2 = [
      `${row + directions2[0][0]},${col + directions2[0][1]}`, // top-left
			`${row + directions2[1][0]},${col + directions2[1][1]}`, // bottom-right
      `${row + directions2[2][0]},${col + directions2[2][1]}`, // bottom-left
			`${row + directions2[3][0]},${col + directions2[3][1]}`, // top-right
    ];

		if (letterPositions["M"].has(pos2[0]) && letterPositions["M"].has(pos2[3])) {
			if (letterPositions["S"].has(pos2[1]) && letterPositions["S"].has(pos2[2])) {
				count++;
			}
		}

		if (letterPositions["M"].has(pos2[0]) && letterPositions["M"].has(pos2[2])) {
			if (letterPositions["S"].has(pos2[1]) && letterPositions["S"].has(pos2[3])) {
				count++;
			}
		}

		if (letterPositions["M"].has(pos2[1]) && letterPositions["M"].has(pos2[2])) {
			if (letterPositions["S"].has(pos2[0]) && letterPositions["S"].has(pos2[3])) {
				count++;
			}
		}

		if (letterPositions["M"].has(pos2[1]) && letterPositions["M"].has(pos2[3])) {
			if (letterPositions["S"].has(pos2[0]) && letterPositions["S"].has(pos2[2])) {
				count++;
			}
		}
  }

  return count;
}

export function part1(input) {
  const grid = processInput(input);
  const result = findAllXMAS(grid);
  return [result, grid];
}

export function part2(input) {

}
