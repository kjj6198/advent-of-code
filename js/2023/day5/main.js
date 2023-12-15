// timeout
// export function part1fail(data) {
//   const maps = data.split("\n\n");
//   let seeds = [];
//   const buildMap = {};
//   let finalLocation = Number.MAX_SAFE_INTEGER;
//   // console.log(maps);
//   maps.forEach((map, i) => {
//     if (i === 0) {
//       const [_, mapInfo] = map.split(": ");
//       seeds = mapInfo.split(" ").map((n) => Number(n));
//     } else {
//       const [category, mapInfo] = map.split(":\n");
//       const infos = mapInfo.split("\n");
//       infos.map((info) => {
//         const [dest, source, range] = info.split(" ").map((n) => Number(n));
//         // console.log(dest, source, range);
//         if (!buildMap[category.replace(":", "")]) {
//           buildMap[category.replace(":", "")] = {};
//         }
//         for (let i = 0; i < range; i++) {
//           buildMap[category.replace(":", "")][(source + i).toString()] = (dest + i).toString();
//         }
//       });
//     }
//   });

//   seeds.forEach((seed) => {
//     const soil = buildMap[`seed-to-soil map`][seed.toString()] || seed.toString();
//     const fertilizer = buildMap[`soil-to-fertilizer map`][soil.toString()] || soil.toString();
//     const water =
//       buildMap[`fertilizer-to-water map`][fertilizer.toString()] || fertilizer.toString();
//     const light = buildMap[`water-to-light map`][water.toString()] || water.toString();
//     const temperature = buildMap[`light-to-temperature map`][light.toString()] || light.toString();
//     const humidity =
//       buildMap[`temperature-to-humidity map`][temperature.toString()] || temperature.toString();
//     const location =
//       buildMap[`humidity-to-location map`][humidity.toString()] || humidity.toString();
//     finalLocation = Math.min(location, finalLocation);
//   });
//   return [finalLocation];
// }

function findFinalLocation(seeds, buildMap) {
  let finalLocation = Number.MAX_SAFE_INTEGER;
  seeds.forEach((seed) => {
    // console.log(seed);
    const keys = [
      "seed-to-soil map",
      `soil-to-fertilizer map`,
      `fertilizer-to-water map`,
      "water-to-light map",
      "light-to-temperature map",
      "temperature-to-humidity map",
      "humidity-to-location map",
    ];

    const location = keys.reduce((result, key) => {
      const rules = buildMap[key];
      let num = result;

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (num >= rule.source && num <= rule.source + rule.range - 1) {
          // console.log("change:", num);
          let diff = Math.abs(rule.source - rule.dest);
          if (rule.source > rule.dest) {
            diff = -diff;
          }

          num = num + diff;

          break;
        }
      }

      return num;
    }, seed);
    console.log(location);
    finalLocation = Math.min(location, finalLocation);
  });

  return finalLocation;
}

function findOverlap(range1, range2) {
  // Destructure the ranges into start and end variables
  const [start1, end1] = range1;
  const [start2, end2] = range2;

  // Check if the ranges overlap by comparing their start and end points
  const overlapStart = Math.max(start1, start2);
  const overlapEnd = Math.min(end1, end2);

  // If the overlap start is less than or equal to the overlap end, then they do overlap
  if (overlapStart <= overlapEnd) {
    // Return the overlapping range
    return [overlapStart, overlapEnd];
  } else {
    // No overlap, return null
    return null;
  }
}

function findFinalLocationSet(ranges, buildMap) {
  let finalLocation = Number.MAX_SAFE_INTEGER;
  const keys = [
    "seed-to-soil map",
    `soil-to-fertilizer map`,
    `fertilizer-to-water map`,
    // "water-to-light map",
    // "light-to-temperature map",
    // "temperature-to-humidity map",
    // "humidity-to-location map",
  ];

  keys.forEach((key) => {
    const rules = buildMap[key];
    ranges.flatMap((range) => {
      const [start, end] = range;
      const result = [];
      for (const rule of rules) {
        const rangeLength = rule.range;
        const overlap = findOverlap([start, end], [rule.source, rule.source + rule.range - 1]);
        if (overlap) {
          const nextStart = rule.dest + (start - rule.source);
          result.push([nextStart, nextStart + (end - start)]);

          console.log(key);
          console.log(overlap, range, result);
        } else {
          console.log("no overlap");
        }
      }
      console.log(result);
      return result;
    });
  });

  return finalLocation;
}

// // timeout
export function part1(data) {
  const maps = data.split("\n\n");
  let seeds = [];
  const buildMap = {};

  maps.forEach((map, i) => {
    if (i === 0) {
      const [_, mapInfo] = map.split(": ");
      seeds = mapInfo.split(" ").map((n) => Number(n));
    } else {
      const [category, mapInfo] = map.split(":\n");
      const infos = mapInfo.split("\n");
      infos.map((info) => {
        const key = category.replace(":", "");
        const [dest, source, range] = info.split(" ").map((n) => Number(n));
        // console.log(dest, source, range);
        if (!buildMap[key]) {
          buildMap[category.replace(":", "")] = [
            {
              dest,
              source,
              range,
            },
          ];
        } else {
          buildMap[key].push({
            dest,
            source,
            range,
          });
        }
      });
    }
  });

  const finalLocation = findFinalLocation(seeds, buildMap);

  return [finalLocation, [seeds, buildMap]];
}

export function part2(result) {
  const [seeds, buildMap] = result;
  const seed2 = [];
  let minLocation = Infinity;
  for (let i = 0; i < seeds.length; i += 2) {
    seed2.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
  }

  const keys = [
    "seed-to-soil map",
    `soil-to-fertilizer map`,
    `fertilizer-to-water map`,
    "water-to-light map",
    "light-to-temperature map",
    "temperature-to-humidity map",
    "humidity-to-location map",
  ];

  findFinalLocationSet(seed2, buildMap);
}
