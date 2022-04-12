/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
  const record = [];
  for( const op of ops ) {
    switch(op) {
      case "+": {
        const [score1, score2] = record.slice(-2);
        record.push(score1+score2);
      }; break;
      case "D": {
        const [score] = record.slice(-1);
        record.push(score*2);
      }; break;
      case "C": {
        record.pop(); 
      }; break;
      default: {
        const score = parseInt(op); 
        record.push(score);
      }; break;
    }
  }
  return record.reduce((S,score) => S + score, 0);
};
