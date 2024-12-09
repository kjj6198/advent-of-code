import { topology } from "./topological_sort";

export function part1(input) {
  const [rules, queries] = input.split("\n\n");

	const all = topology(rules, queries);
	console.log(all)

}

export function part2(input) {}
