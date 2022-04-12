/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function(grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const arr = grid.flat(2);
  k = k % (m*n);
  const shifted = [...arr.slice(-k), ...arr.slice(0,-k)];
  for( let i = 0; i < m; i++ ) {
    for( let j = 0; j < n; j++ ) {
      // slower
      //grid[i][j] = shifted.shift();
      // faster
      grid[i][j] = shifted[i*n+j];
    }
  } 
  return grid;
};

