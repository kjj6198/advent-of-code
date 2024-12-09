export function topologicalSort(rules, sections) {
  const graph = new Map();
  const inDegree = new Map();

  // Build the graph and calculate in-degrees
  for (const rule of rules) {
    const [from, to] = rule.split('|').map(Number);
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
    inDegree.set(to, (inDegree.get(to) || 0) + 1);
  }

  function isValidOrder(section) {
    const queue = section.filter(node => !inDegree.has(node) || inDegree.get(node) === 0);
    const visited = new Set(queue);
    let index = 0;

    while (index < queue.length) {
      const node = queue[index++];
      if (graph.has(node)) {
        for (const neighbor of graph.get(node)) {
          if (section.includes(neighbor) && !visited.has(neighbor)) {
            const newInDegree = inDegree.get(neighbor) - 1;
            if (newInDegree === 0) {
              queue.push(neighbor);
              visited.add(neighbor);
            }
          }
        }
      }
    }

    return visited.size === new Set(section).size;
  }

  const result = [];
  for (const section of sections) {
    if (isValidOrder(section)) {
      const middleIndex = Math.floor(section.length / 2);
      result.push(section[middleIndex]);
    }
  }

  return result;
}
