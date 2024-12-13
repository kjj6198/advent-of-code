const math = require("mathjs");

function solve(ax, bx, ay, by, x, y, p = 0) {
  const M = math.matrix([
    [ax, bx],
    [ay, by],
  ]);
  const P = math.matrix([x + p, y + p]);
  const R = math.lusolve(M, P);
	console.log(R.toArray())
  const [a, b] = R.toArray().map((val) => val[0]);

  return [a, b];
}

export function part1(input) {
  const rules = input.split("\n\n");
  let sum = 0;
  rules.forEach((rule) => {
    let [a, b, price] = rule.split("\n");
    const [, ax, ay] = a.match(/X\+(\d+), Y\+(\d+)/);
    const [, bx, by] = b.match(/X\+(\d+), Y\+(\d+)/);
    const [, x, y] = price.match(/X\=(\d+), Y\=(\d+)/);

    const result = solve(
      Number(ax),
      Number(bx),
      Number(ay),
      Number(by),
      Number(x),
      Number(y)
    );

    const [aa, bb] = result;

    if (aa % 1 === 0 && bb % 1 === 0) {
      sum += aa * 3 + bb;
    }
  });

  console.log(sum);
}

export function part2(input) {
  const rules = input.split("\n\n");
  let sum = 0;
  rules.forEach((rule) => {
    let [a, b, price] = rule.split("\n");
    const [, ax, ay] = a.match(/X\+(\d+), Y\+(\d+)/);
    const [, bx, by] = b.match(/X\+(\d+), Y\+(\d+)/);
    const [, x, y] = price.match(/X\=(\d+), Y\=(\d+)/);
  });
}
