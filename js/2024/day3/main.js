
export function part1(input) {
	const regex = /mul\((\d+),(\d+)\)/g;
	const matches = input.match(regex);
	
	const sum = matches.reduce((acc, match) => {
		const [_, num1, num2] = match.match(/mul\((\d+),(\d+)\)/);
		return acc + (Number(num1) * Number(num2))
	}, 0)

	return [sum, input]
}

export function part2(input) {
	let register = 1;
	
	const regex = /(?:mul\((\d+),(\d+)\))|(?:don't\(\)|do\(\))/g;
	const matches = input.match(regex);

	const sum = matches.reduce((acc, match) => {
		
		if (match === "don't()") {
			register = 0;
		} else if (match === "do()") {
			register = 1;
		}
		
		const result = match.match(/mul\((\d+),(\d+)\)/);

		if (!result) {
			return acc
		}

		const [_, num1, num2] = result;
		
		return acc + (Number(num1) * Number(num2) * register)
	}, 0)

	return [sum]

}
