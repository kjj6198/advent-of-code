function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function combinations(n, k) {
  if (k < 0 || n < 0 || k > n) {
    return 0; // Return 0 for invalid cases
  }
  if (k > n - k) {
    k = n - k;
  }
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= n - i;
    result /= i + 1;
  }
  return result;
}

export function part1(input) {
  const data = input.split("\n").map((n) =>
    n
      .split(" ")
      .map((n) => n.trim())
      .map((n) => Number(n)),
  );
  let sum = 0;
  data.forEach((d) => {
    let result = d;
    let len = d.length;
    sum += result.slice(-1)[0];
    while (true) {
      let tmp = [];
      for (let i = 0; i < len - 1; i++) {
        const diff = result[i + 1] - result[i];
        tmp.push(diff);
      }
      len--;
      sum += tmp.slice(-1)[0];
      result = tmp;
      if (result.every((r) => r === 0)) {
        break;
      }
    }
  });

  return [sum, data];
}

// Pascal's triangle
export function part2(data) {
  let sum = 0;
  data.forEach((d) => {
    d.forEach((num, i) => {
      const comb = combinations(d.length, i + 1);
      sum += num * comb * Math.pow(-1, i);
    });
  });
  return sum;
}
