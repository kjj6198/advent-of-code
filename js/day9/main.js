class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isNeighbor(point) {
    return (
      (point.x === this.x ||
        point.x - 1 === this.x ||
        point.x + 1 === this.x) &&
      (point.y === this.y || point.y - 1 === this.y || point.y + 1 === this.y)
    );
  }

  add(x, y) {
    this.x += x;
    this.y += y;
  }

  vector(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  product(point) {
    return point.x * this.x + point.y * this.y;
  }
}
class Rope {
  constructor(isFirst = false) {
    this.isFirst = isFirst;
    this.head = new Point(0, 0);
    this.tail = new Point(0, 0);
  }

  move(direction) {
    if (this.isFirst) {
      switch (direction) {
        case "U":
          this.head.add(0, 1);
          break;
        case "D":
          this.head.add(0, -1);
          break;

        case "L":
          this.head.add(-1, 0);
          break;

        case "R":
          this.head.add(1, 0);
          break;
      }
    }

    if (!this.head.isNeighbor(this.tail)) {
      // calculate vector
      // move to direction
      const vec = this.head.vector(this.tail);
      const degree = vec.product(new Point(1, 0)) / vec.length();
      const degree2 = vec.product(new Point(0, 1)) / vec.length();
      if (degree === 0) {
        // horizontal, vertial
        if (degree2 > 0) {
          this.tail.add(0, 1);
        } else {
          this.tail.add(0, -1);
        }
      } else if (Math.abs(degree) === 1) {
        if (degree === 1) {
          this.tail.add(1, 0);
        } else {
          this.tail.add(-1, 0);
        }
      } else {
        this.tail.add(degree > 0 ? 1 : -1, degree2 > 0 ? 1 : -1);
      }
    }
  }
}

export function part1(input) {
  const direction = input.split("\n");

  const rope = new Rope(true);
  const set = new Set();
  direction.forEach((dir) => {
    const [d, step] = dir.split(" ");
    for (let i = 0; i < Number(step); i++) {
      rope.move(d);

      set.add(`(${rope.tail.x}, ${rope.tail.y})`);
    }
  });

  return [set.size, direction];
}

export function part2(direction) {
  const ropes = [
    new Rope(true),
    new Rope(),
    new Rope(),
    new Rope(),
    new Rope(),
    new Rope(),
    new Rope(),
    new Rope(),
    new Rope(),
  ];
  const set = new Set();

  direction.forEach((dir, ii) => {
    const [d, step] = dir.split(" ");
    for (let i = 0; i < Number(step); i++) {
      ropes.forEach((rope, j) => {
        if (j === 0) {
          rope.move(d);
        } else {
          rope.head = ropes[j - 1].tail;
          rope.move(d);
        }
      });
      set.add(
        `${ropes[ropes.length - 1].tail.x} ${ropes[ropes.length - 1].tail.y}`
      );
    }
  });

  return set.size;
}
