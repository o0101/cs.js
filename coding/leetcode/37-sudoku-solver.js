const DEBUG = false;
const SZ = 9;
const Z = new Set([1,2,3,4,5,6,7,8,9].map(n => n.toString()));
const E0 = 
  [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
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
let flag = false;

let isValidSudoku = function(board) {
  return rowsValid(board) && columnsValid(board) && squaresValid(board);
}

let solveSudoku = function(board) {
  const result = recursiveSolver(board, 0, 0);
  DEBUG && console.log('solved', result.solved);
  result.board.forEach(row => console.log(row.join('  ')));
  DEBUG && console.log('valid', isValidSudoku(result.board));
  return result.board;
}

solveSudoku(E0);

// solver
  function recursiveSolver(board, startI, startJ) {
    DEBUG && console.group('recsolv', startI, startJ);
    let columns, squares;
    for( let i = startI; i < SZ; i++ ) {
      DEBUG && console.log('i', i);
      for( let j = startJ; j < SZ; j++ ) {
        if ( startJ > 0 ) {
          //console.log({startJ,j});
          //startJ = 0;
        }
        DEBUG && console.log(i,j);
        const cell = board[i][j];
        if ( cell === "." ) {
          ({board, columns, squares} = snapshotBoard(board));
          const vals = getPossibleValues({board, columns, squares, i, j});
          DEBUG && console.log(vals);
          if ( vals.length === 1 ) {
            board[i][j] = vals[0]
            return recursiveSolver(board, i, j+1);
          } else if ( vals.length > 1 ) {
            for( const val of vals ) {
              board[i][j] = val;
              const result = recursiveSolver(board, i, j+1);
              if ( result.solved ) {
                DEBUG && console.groupEnd();
                return result;
              }
            }
            DEBUG && console.groupEnd();
            return {solved: false};
          } else if ( vals.length === 0 ) {
            DEBUG && console.groupEnd();
            return {solved: false};
          }
        }
      }
      startJ = 0;
    }
    DEBUG && console.groupEnd();
    return {solved: true, board};
  }

  function snapshotBoard(b) {
    const board = clone(b);
    return {
      board,
      columns: columns(board),
      squares: squaresAsVectors(board).boxes
    };
  }
  
  function getPossibleValues({board, columns, squares, i, j}) {
    const rowI = board[i];
    const colJ = columns[j];
    const I = (i-(i%3))/3;
    const J = (j-(j%3))/3;
    const square = squares[I][J];
    const vals = possibleValues(rowI, colJ, square);
    return [...vals];
  }

  function possibleValues(...vectors) {
    const sets = vectors.map(v => new Set(v.filter(m => m !== "."))) 
    const missingSets = sets.map(missing);
    return intersect(...missingSets);
  }

  function missing(a) {
    return disjoint(Z,a);
  }

  function disjoint(a, b) {
    const d = new Set(a);
    b.forEach(k => d.delete(k));
    return d;
  }
  function intersect(...sets) {
    const base = sets.shift();
    const intersection = new Set();
    base.forEach(k => {
      let member = true;
      for( const s of sets ) {
        if ( !s.has(k) ) {
          member = false;
          break;
        }
      }
      if ( member ) {
        intersection.add(k);
      }
    });
    return intersection;
  }

  function clone(b) {
    return JSON.parse(JSON.stringify(b));
  }

// valid tests
  //console.log(isValidSudoku(E1));
  //console.log(isValidSudoku(E2));

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
        DEBUG && console.log('Invalid duplicate value', {set, i, val});
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

