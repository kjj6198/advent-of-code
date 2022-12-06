export function part1(input) {
  const signal = input.split("\n")[0];

  const common = new Set();
  let l = 0;
  let r = 0;
  while (r < signal.length) {
    while (common.has(signal[r])) {
      common.delete(signal[l]);
      l++;
    }

    common.add(signal[r]);
    r++;
    if (r - l === 4) {
      break;
    }
  }

  return [r, signal];
}

export function part2(signal) {
  const common = new Set();
  let l = 0;
  let r = 0;
  while (r < signal.length) {
    while (common.has(signal[r])) {
      common.delete(signal[l]);
      l++;
    }

    common.add(signal[r]);
    r++;
    if (r - l === 14) {
      break;
    }
  }

  return r;
}
