function simulateRobotMovement(warehouse, moves) {
  warehouse = warehouse.split("\n").map((line) => line.split(""));
  let robotX, robotY;
  for (let i = 0; i < warehouse.length; i++) {
    const row = warehouse[i];
    const robotIndex = row.indexOf("@");
    if (robotIndex !== -1) {
      robotX = i;
      robotY = robotIndex;
      warehouse[i][robotIndex] = ".";
      break;
    }
  }

  // Directions mapping
  const directions = {
    "^": [0, -1],
    v: [0, 1],
    "<": [-1, 0],
    ">": [1, 0],
  };

  // Process each move
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    console.log(`move is ${move}, ${i}`);
    const [dx, dy] = directions[move];
    console.log(robotX, robotY, dx, dy);
    let newX = robotX + dx;
    let newY = robotY + dy;

    // Check for walls
    if (warehouse[newY][newX] === "#") continue;

    if (warehouse[newY][newX] === ".") {
      robotX = newX;
      robotY = newY;
    }

    // Check for boxes
    if (warehouse[newY][newX] === "O") {
      // Check if the box can be pushed
      while (warehouse[newY][newX] === "O") {
        newX += dx;
        newY += dy;
      }

      if (warehouse[newY][newX] === "#") {
        continue;
      } else if (warehouse[newY][newX] === ".") {
        while (!(newX === robotX && newY === robotY)) {
          warehouse[newY][newX] = warehouse[newY - dy][newX - dx];
          newX -= dx;
          newY -= dy;
        }
        robotX += dx;
        robotY += dy;
      }
    }

    for (let y = 0; y < warehouse.length; y++) {
      for (let x = 0; x < warehouse[0].length; x++) {
        if (x === robotX && y === robotY) {
          process.stdout.write("@");
          continue;
        }
        process.stdout.write(warehouse[y][x]);
      }
    }
  }

  // Calculate GPS coordinates
  let gpsSum = 0;

  for (let i = 0; i < warehouse.length; i++) {
    for (let j = 0; j < warehouse[i].length; j++) {
      if (warehouse[i][j] === "O") {
        gpsSum += 100 * i + j;
      }
    }
  }

  return gpsSum;
}

export function part1(input) {
  let [warehouse, moves] = input.split("\n\n");
  moves = moves.trim().split("\n").join("");
  const gpsSum = simulateRobotMovement(warehouse, moves);

  return [gpsSum];
}
