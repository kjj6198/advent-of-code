export function part1(input) {
  const files = [];
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < Number(input[i]); j++) {
      if (i % 2 === 0) {
        files.push(id);
      } else {
        files.push(`.`);
      }
    }

    if (i % 2 === 0) {
      id++;
    }
  }

  const files2 = [...files];

  let left = 0;
  let right = files.length - 1;

  while (left < right) {
    if (files[left] === ".") {
      while (files[right] === ".") right--;

      if (right < left) break;
      files[left] = files[right];
      files[right] = `.`;
    }
    left++;
  }

  const sum = files
    .filter((f) => f !== ".")
    .reduce((acc, f, i) => acc + Number(f) * i, 0);
  return [sum, files2];
}


function defrag(files) {

}

export function part2(input) {
  const files = [];
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < Number(input[i]); j++) {
      if (i % 2 === 0) {
        files.push({
					id: id++,
					size: Number(input[i]),
				});
      } else {
        files.push({
					id: null,
					size: Number(input[i]),
				});
      }
    }
  }

	
}
