function numIslands(grid: string[][]): number {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const rowCount = grid.length;
  const colCount = grid[0].length;
  //#1

  function dfs(i: number, j: number) {
    //#2
    const isOutOfBounds = i < 0 || i >= rowCount || j < 0 || j >= colCount;
    if (isOutOfBounds) {
      //#3
      return;
    }
    const isWater = grid[i][j] !== "1";
    if (isWater) {
      //#4
      return;
    }

    //#5
    grid[i][j] = "2"; // Mark the cell as visited
    for (const d of directions) {
      let [x, y] = d;
      //#6
      x += i;
      y += j;

      //#7
      dfs(x, y);
    }
  }

  let numIslands = 0;

  // Iterate over the grid to find islands
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      //#8
      if (grid[i][j] === "1") {
        //#9
        numIslands++;
        dfs(i, j);
      }
    }
  }

  return numIslands;
}
