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

console.log(findOverlap([74, 87], [77, 99]));
