class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const direction = {
  L: "left",
  R: "right",
};

function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm1(a, b) {
  return (a * b) / gcd(a, b);
}

function lcm(...numbers) {
  return numbers.reduce((lcmSoFar, currentNumber) => {
    return lcm1(lcmSoFar, currentNumber);
  });
}

export function part1(input) {
  const [instruction, rest] = input.split("\n\n");
  let nodes = rest.split("\n");
  nodes = nodes.map((node) => {
    const match = node.match(/(\w{3}) = \((\w{3}), (\w{3})\)/);
    const [_, value, left, right] = match;
    const n = new Node(value);
    n.left = left;
    n.right = right;

    return n;
  });

  let target = nodes.find((n) => n.value === "AAA");
  let destination = nodes.find((n) => n.value === "ZZZ");
  let i = 0;
  let step = 0;
  while (target && target.value !== destination.value) {
    const next = direction[instruction[i]];
    target = nodes.find((n) => n.value === target[next]);
    i = (i + 1) % instruction.length;
    step++;
  }
  return [step, [nodes, instruction]];
}

// why LCM works?
export function part2(input) {
  const [nodes, instruction] = input;
  let targets = nodes.filter((n) => n.value.endsWith("A"));
  let steps = [];
  for (const target of targets) {
    let t = target;
    let i = 0;

    let step = 0;
    while (true) {
      const nextDirection = direction[instruction[i]];
      if (t.value.endsWith("Z")) {
        steps.push(step);
        break;
      }
      step++;
      t = nodes.find((node) => t[nextDirection] === node.value);
      i = (i + 1) % instruction.length;
    }
  }
  return [lcm(...steps)];
}
