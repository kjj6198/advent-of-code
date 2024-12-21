function simulate(input, width = 101, height = 103, seconds = 100) {
  const robots = input.split("\n").map((line) => {
    const [pos, vel] = line.split(" ");
    const [px, py] = pos.split("=")[1].split(",").map(Number);
    const [vx, vy] = vel
      .split("=")
      .filter((v) => v !== "v")
      .map((v) => v.split(",").map(Number))
      .flat();
    return { x: px, y: py, vx, vy };
  });

  const quadrants = [0, 0, 0, 0]; // TL, TR, BL, BR
  robots.forEach((robot) => {
    robot.x = robot.x + robot.vx * seconds;
    robot.y = robot.y + robot.vy * seconds;

    while (robot.x < 0) robot.x += width;
    while (robot.x >= width) robot.x -= width;
    while (robot.y < 0) robot.y += height;
    while (robot.y >= height) robot.y -= height;

    if (robot.x < Math.floor(width / 2) && robot.y < Math.floor(height / 2)) {
      quadrants[0]++;
    } else if (
      robot.x > Math.floor(width / 2) &&
      robot.y < Math.floor(height / 2)
    ) {
      quadrants[1]++;
    } else if (
      robot.x < Math.floor(width / 2) &&
      robot.y > Math.floor(height / 2)
    ) {
      quadrants[2]++;
    } else if (
      robot.x > Math.floor(width / 2) &&
      robot.y > Math.floor(height / 2)
    ) {
      quadrants[3]++;
    }
  });

  const map = new Map();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      robots.forEach((robot) => {
        if (robot.x === x && robot.y === y) {
          map.set(`${x},${y}`, (map.get(`${x},${y}`) || 0) + 1);
        }
      });

      process.stdout.write(`${map.has(`${x},${y}`) ? "#" : "."}`);
    }
    process.stdout.write("\n");
  }

  // Just a dirty way to check christmas tree
  // for (let y = 0; y < height; y++) {
  //   let max = 0;
  //   let curr = 0;
  //   for (let x = 0; x < width; x++) {
  //     if (map.has(`${x},${y}`)) {
  //       curr++;
  //       max = Math.max(max, curr);
  //     } else {
  //       curr = 0;
  //     }
  //   }
  //   if (max >= 15) {
  //     console.log("maybe?");
  //     return true;
  //   }
  // }

  const safetyFactor = quadrants.reduce((a, b) => a * b, 1);
  return safetyFactor;
}

export function part1(input) {
  return [simulate(input, 101, 103), input];
}

export function part2(input) {
  return [simulate(input, 101, 103, 8159)];
}
