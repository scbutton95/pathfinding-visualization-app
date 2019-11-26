
// initialized with grid (basically 2-d array with nodes, with attributes given in class)
// also have startNode and finishNode for the search to run
export function dijkstra(grid, startNode, finishNode) {
  // returns the below visitedNodesInOrder which are all Nodes... TBU
  const visitedNodesInOrder = [];
  // given we pick smallest distance node, start has distance 0 from INF
  startNode.distance = 0;
  // initally all nodes are unvisited, including the start node (but we guarantee that the 
  // start node is the first to get visited because its distance is 0)
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    // every time we have not visited all nodes, sort the nodes based on distance
    sortNodesByDistance(unvisitedNodes);
    // takes the first value out of the array and returns
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    // return in the case that we find our goal
    if (closestNode === finishNode) return visitedNodesInOrder;
    // updates distanceTo neighbors of the closest node
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  // sort, takes a compare function, which allows you to sort a list of objects based on the comparison of the two
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  // jsut append all nodes of the grid to the below list
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    // adds to front the next node
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}