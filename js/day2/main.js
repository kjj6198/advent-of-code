export function part1(input) {
  const rounds = input.split("\n");
  const point = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  const rule = {
    A: {
      X: 3,
      Y: 6,
      Z: 0,
    },
    B: {
      X: 0,
      Y: 3,
      Z: 6,
    },
    C: {
      X: 6,
      Y: 0,
      Z: 3,
    },
  };
  let sum = 0;
  rounds
    .filter((n) => Boolean(n))
    .forEach((round) => {
      const [opponent, me] = round.split(" ");
      const p = rule[opponent][me] + point[me];
      sum += p;
    });

  return [sum, rounds.filter((n) => Boolean(n))];
}

export function part2(input) {
  const point = {
    A: 1,
    B: 2,
    C: 3,
  };

  const rule = {
    A: {
      X: [0 + point.C, "C"],
      Y: [3 + point.A, "A"],
      Z: [6 + point.B, "B"],
    },
    B: {
      X: [0 + point.A, "A"],
      Y: [3 + point.B, "B"],
      Z: [6 + point.C, "C"],
    },
    C: {
      X: [0 + point.B, "B"],
      Y: [3 + point.C, "C"],
      Z: [6 + point.A, "A"],
    },
  };
  let sum = 0;
  input.forEach((round) => {
    const [oppo, me] = round.split(" ");
    sum += rule[oppo][me][0];
  });

  return sum;
}
