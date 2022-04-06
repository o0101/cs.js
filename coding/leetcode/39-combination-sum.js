var combinationSum = function(candidates, target) {
  candidates = candidates.map(n => parseInt(n));
  candidates.sort((a,b) => a-b); // increasing order makes precomputation easier
};

