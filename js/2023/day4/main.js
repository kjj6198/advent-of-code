export function part1(data) {
  const cards = data.split("\n");
  let points = 0;
  const cardsMap = [];

  cards.forEach((card, i) => {
    const point = new Set();
    card = card.replace(/Card \d+: /, "");
    const [winning, mine] = card.split(" | ");
    const nums = winning
      .split(" ")
      .filter((num) => num !== "")
      .map((num) => Number(num));
    const myNums = mine
      .split(" ")
      .filter((num) => num !== "")
      .map((num) => Number(num));
    nums.forEach((num) => point.add(num));
    let myPoint = -1;
    myNums.forEach((num) => {
      if (point.has(num)) {
        myPoint++;
      }
    });

    points += myPoint > -1 ? Math.pow(2, myPoint) : 0;
    cardsMap.push({
      no: (i + 1).toString(),
      winningNums: new Set(nums),
      mine: myNums,
    });
  });

  return [points, cardsMap];
}

export function part2(cardsMap) {
  const countMap = {};

  cardsMap.forEach((card) => {
    countMap[card.no.toString()] = 1;
  });

  cardsMap.forEach((card) => {
    let myPoint = 0;
    card.mine.forEach((num) => {
      if (card.winningNums.has(num)) {
        myPoint++;
      }
    });
    const no = Number(card.no);
    if (myPoint > 0) {
      for (let i = no + 1; i <= no + myPoint; i++) {
        console.log(i, countMap[no.toString()]);
        countMap[i.toString()] += countMap[no.toString()];
      }
    }
  });
  return Object.values(countMap).reduce((a, b) => a + b, 0);
}
