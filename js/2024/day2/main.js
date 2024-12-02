function isUnique(arr, element) {
  const counts = new Map();
  for (const num of arr) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  return counts.get(element) === 1;
}

function countDiffs(arr) {
  // god solution from
  // https://www.reddit.com/r/adventofcode/comments/1h4ncyr/2024_day_2_solutions/
  const safepos = new Set([1, 2, 3]);
  const safeneg = new Set([-1, -2, -3]);

  for (let i = 1; i < arr.length; i++) {
    safepos.add(arr[i] - arr[i - 1]);
    safeneg.add(arr[i] - arr[i - 1]);
  }

	// console.log(safeneg, safepos);
  if (safeneg.size === 3 || safepos.size === 3) {
    return true;
  }

  return false;
}

export function part1(input) {
  const levels = input.split("\n");
  let count = 0;
  levels.forEach((level) => {
    const levelList = level.split(" ").map((n) => Number(n));
    let isSafe = false;
    const diffs = [];
    for (let i = 0; i < levelList.length - 1; i++) {
      const diff = levelList[i + 1] - levelList[i];

      diffs.push(diff);
    }

    if (
      diffs.every((d) => d >= 1 && d <= 3) ||
      diffs.every((d) => d <= -1 && d >= -3)
    ) {
      isSafe = true;
    }

    if (isSafe) {
      count++;
    }
  });

  return [count, levels];
}

export function part2(input) {
  let count = 0;
  input.forEach((level) => {
    const levelList = level.split(" ").map((n) => Number(n));
		if (countDiffs(levelList)) {
			count++;
		} else {

			for (let i = 0; i < levelList.length; i++) {
				let newList = levelList.slice();
				newList.splice(i, 1);
				if (countDiffs(newList)) {
					count++;
					break;
				}
			}
		}	
  });

	return [count];
}
