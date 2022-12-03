const getPriority = (letter) => {
  if (letter.charCodeAt(0) >= 96) {
    return letter.charCodeAt(0) - 96;
  }
  return letter.charCodeAt(0) - 38;
};
export function part1(input) {
  const group = input.split("\n");
  let sum = 0;
  group.forEach((g) => {
    const one = g.slice(0, Math.floor(g.length / 2)).split("");
    const two = g.slice(Math.ceil(g.length / 2));
    for (let i = 0; i < one.length; i++) {
      const letter = one[i];
      if (two.includes(letter)) {
        sum += getPriority(letter);

        break;
      }
    }
  });
  return [sum, input];
}

export function part2(input) {
  const group = input.split("\n");
  let sum = 0;
  for (let i = 0; i < group.length; i += 3) {
    const l1 = group[i];
    const l2 = group[i + 1];
    const l3 = group[i + 2];
    for (let j = 0; j < l1.length; j++) {
      const letter = l1[j];
      if (l2.includes(letter) && l3.includes(letter)) {
        sum += getPriority(letter);
        break;
      }
    }
  }
  return sum;
}
