const SZ = 9;
const E1 = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]];
const E2 = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]];

let isValidSudoku = function(board) {
  return rowsValid(board) && columnsValid(board) && squaresValid(board);
}

console.log(isValidSudoku(E1));
console.log(isValidSudoku(E2));

function rowsValid(b) {
  return b.every(vectorValid);
}

function columnsValid(b) {
  return columns(b).every(vectorValid);
}

function squaresValid(b) {
  return squaresAsVectors(b).squares.every(vectorValid);
}

function vectorValid(v) {
  const set = new Set();
  let isValid = true;
  let i, val;
  for( i = 0; i < SZ; i++ ) {
    val = v[i];
    if ( val === "." ) continue;
    if ( ! set.has(val) ) {
      set.add(val);
    } else {
      console.log(set, i, val);
      isValid = false;
      break;
    }
  }
  return isValid;
}

function squaresAsVectors(b) {
  const squares = []; 
  for( let i = 0; i < SZ; i++ ) {
    const row = b[i];
    const iM3 = i % 3;
    const sqI = (i-iM3)/3;
    let sqRow = squares[sqI];
    if ( ! sqRow ) {
      sqRow = squares[sqI] = [];
    }
    for( let j = 0; j < SZ; j++ ) {
      const cell = row[j];
      const jM3 = j % 3;
      const sqJ = (j-jM3)/3;
      let sq = sqRow[sqJ];
      if ( ! sq ) {
        sq = sqRow[sqJ] = []; 
      }
      sq.push(cell);
    }
  }
  //console.log(squares);
  return {boxes:squares,squares:squares.flat(1)};
}

function columns(b) {
  const cols = [];
  b.forEach(row => {
    for( let j = 0; j < SZ; j++ ) {
      let col = cols[j];
      if ( ! col ) {
        col = cols[j] = [];
      }
      col.push(row[j]);
    }
  });
  return cols;
}

