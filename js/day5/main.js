function parseStack(stack) {
  const groups = stack.split("\n");
  const count = groups.slice(-1);
  const max = Math.max(...count[0].split(/   /).map((n) => Number(n)));
  const stackGroup = Array.from({ length: max }).map((n) => []);
  for (let j = 0; j < groups.length - 1; j++) {
    for (let i = 0; i < max; i++) {
      const letter = groups[j][i * 4 + 1];
      if (letter !== " ") {
        stackGroup[i].unshift(letter);
      }
    }
  }
  return stackGroup;
}
export function part1(input) {
  const [stack, instructions] = input.split("\n\n");
  const result = parseStack(stack);
  instructions.split("\n").forEach((ins) => {
    const [_, move, from, to] = ins.match(/move (\d+) from (\d+) to (\d+)/);
    for (let i = 0; i < Number(move); i++) {
      result[Number(to) - 1].push(result[Number(from) - 1].pop());
    }
  });
  let final = "";
  result.forEach((r) => {
    final += r.pop();
  });

  return [final, input];
}

export function part2(input) {
  const [stack, instructions] = input.split("\n\n");
  const result = parseStack(stack);
  instructions.split("\n").forEach((ins) => {
    const [_, move, from, to] = ins.match(/move (\d+) from (\d+) to (\d+)/);
    const f = result[Number(from) - 1];
    const t = result[Number(to) - 1];
    const startPoint = f.length - Number(move);
    const deleteCount = Number(move);

    t.push(...f.splice(startPoint, deleteCount));
  });
  // console.log(result);
  let final = "";
  result.forEach((r) => {
    final += r.pop();
  });
  return [final];
}
