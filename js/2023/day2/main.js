export function part1(data) {
  let sum = 0;
  const games = data.split("\n");
  const max = {
    red: 12,
    green: 13,
    blue: 14,
  };
  games.forEach((game) => {
    const [gameNum, result] = game.split(":");
    const sets = result.split(";");
    let blueOk = true;
    let redOk = true;
    let greenOk = true;
    sets.forEach((set) => {
      const balls = set.split(",");

      for (let i = 0; i < balls.length; i++) {
        const blue = balls[i].match(/(\d+) blue/);
        const green = balls[i].match(/(\d+) green/);
        const red = balls[i].match(/(\d+) red/);
        if (blue) {
          const num = parseInt(blue[1], 10);
          if (Math.max(num, max.blue) > max.blue) blueOk = false;
        }

        if (green) {
          const num = parseInt(green[1], 10);
          if (Math.max(num, max.green) > max.green) greenOk = false;
        }
        if (red) {
          const num = parseInt(red[1], 10);
          if (Math.max(num, max.red) > max.red) redOk = false;
        }
      }
    });

    if (blueOk && redOk && greenOk) {
      const [, num] = gameNum.split(" ");
      sum += parseInt(num);
    }
  });

  return [sum, games];
}

export function part2(games) {
  let sum = 0;

  games.forEach((game) => {
    const [gameNum, result] = game.split(":");
    const sets = result.split(";");
    let maxBlue = Number.MIN_SAFE_INTEGER;
    let maxRed = Number.MIN_SAFE_INTEGER;
    let maxGreen = Number.MIN_SAFE_INTEGER;
    sets.forEach((set) => {
      const balls = set.split(",");

      for (let i = 0; i < balls.length; i++) {
        const blue = balls[i].match(/(\d+) blue/);
        const green = balls[i].match(/(\d+) green/);
        const red = balls[i].match(/(\d+) red/);
        if (blue) {
          const num = parseInt(blue[1], 10);
          maxBlue = Math.max(maxBlue, num);
        }

        if (green) {
          const num = parseInt(green[1], 10);
          maxGreen = Math.max(maxGreen, num);
        }
        if (red) {
          const num = parseInt(red[1], 10);
          maxRed = Math.max(maxRed, num);
        }
      }
    });
    console.log(maxRed, maxBlue, maxGreen);

    sum += maxBlue * maxRed * maxGreen;
  });

  return sum;
}
