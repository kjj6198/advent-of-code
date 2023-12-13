class CPU {
  constructor() {
    this.x = 1;
    this.cycles = 0;
    this.signal = 0;
    this.screen = "";
  }

  log() {
    this.signal += this.cycles * this.x;
  }

  tick() {
    this.draw();
    this.cycles += 1;

    if ((this.cycles + 20) % 40 === 0) {
      this.log();
    }
  }

  noop() {
    this.tick();
  }

  addx(arg) {
    this.tick();
    this.tick();
    this.x += parseInt(arg);
  }

  draw() {
    const column = this.cycles % 40;
    if (column === 0 && this.cycles !== 0) {
      this.screen += "\n";
    }
    if (this.x - 1 === column || this.x === column || this.x + 1 === column) {
      this.screen += "#";
    } else {
      this.screen += ".";
    }
  }
}

export function part1(input) {
  let cycles = 0;
  const cpu = new CPU();
  const instructions = input.split("\n");

  instructions.forEach((ins) => {
    const [command, arg] = ins.split(" ");

    if (command === "noop") {
      cpu.noop();
    }
    if (command === "addx") {
      cpu.addx(arg);
    }
  });
  console.log(cpu.signal);
  return [cpu.signal, cpu];
}

export function part2(cpu) {
  console.log(cpu.screen);
  return [];
}
