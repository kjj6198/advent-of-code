import { buildMaxHeap, maxHeapify } from "../utils/heap.js";
export function part1(input) {
  const elfs = input.split("\n\n");
  let max = 0;
  const group = [];
  elfs.forEach((elf) => {
    const calories = elf.split("\n");
    let sum = 0;
    for (let i = 0; i < calories.length; i++) {
      sum += Number(calories[i]);
    }
    group.push(sum);
    max = Math.max(max, sum);
  });

  return [max, group];
}

// normal sort: O(nlogn)
// export function part2(group) {
//   group.sort((a, b) => b - a);
//   return group[0] + group[1] + group[2];
// }

// heap O(3*logN)
export function part2(group) {
  buildMaxHeap(group);
  const result = [];
  let heapSize = group.length;
  let n = group.length;
  for (let i = n - 1; i >= n - 3; i--) {
    [group[0], group[i]] = [group[i], group[0]];
    heapSize--;
    result.push(group[i]);
    group.pop();
    maxHeapify(group, 0, heapSize);
  }
  return result[0] + result[1] + result[2];
}
