// Max profit buy, sell across a list of numbers
  // find i,j such that
  // buy_i < sell_j && 
  // sell_i - buy_j >= sell_k - buy_l for all (k,l)
  // no idea how but my instinct is we can
  // check a few cases before we update buy, and sell.
  // and we basically take the array 2 at a time, probably overlapping
  // 0,  1, 2, 3, 4, 5 [index]
  // 10, 1, 2, 3, 4, 5 [value]
  // i,  j
  // max = [1 - 10, 0, 1]
  // 10, 1, 2, 3, 4, 5 [value]
  // i,   , j
  // maxA = [1 - 10, 0, 1]
  // maxB = [2 - 1, 1, 2]
  // max = maxB
  // 10, 1, 2, 3, 4, 5 [value]
  //  ,  i,  , j
  // ...
  // 10, 1, 2, 3, 4, 5 [value]
  //  ,  i,  ,  , ,  j
  // max = [5 - 1, 1, 5]
  // I think you can do this with no backtracking and no extra steps
  // if you just check that nothing is less than buy. If something is less than buy, then 
  // and if something is greater than sell then update sell to that, but i sense this will
  // miss a few cases
  // maybe i work it by hand

// Below is the implementation of the solution
  // I created it by the above initial design sketches
  // combined with working a few simple examples by hand
  // plus enumerating, as I see it, the 3 cases where a
  // buy, sell margin can increase over time
  // It may not be perfect. 
  // It has passed all the examples given so far. 
  // I have created it before checking the solution.
  // I will check the solution now.

// After reading the given solution it seems that
// my algorithm is essentially the same

// Upon reviewing the solution
// I simplified my algorithm by removing the outer loop
// Still works

const DEBUG = false;

let findBuySellStockPrices = function(price) {
  let buyt = 0;
  let sellt = 1;
  let buy = price[buyt];
  let sell = price[sellt];

  if ( price.length > 2 ) {
    let margin = sell - buy;
    let lessert = buyt;

    for( let i = sellt; i < price.length; i++ ) {
      const spot = price[i];
      DEBUG && console.log({spot,i});

      // CASE 1 & 3
        if ( spot > sell && lessert < i ) {
          buyt = lessert;
          sellt = i;
          buy = price[buyt];
          sell = price[sellt];
          margin = sell - buy;
          DEBUG && console.log({case1:{margin, buyt, sellt, buy, sell}});
        }   

      // case 2
        const newMargin = (spot - price[lessert]);
        DEBUG && console.log({newMargin});
        if ( newMargin > margin && lessert < i ) {
          sellt = i;
          buyt = lessert;
          buy = price[buyt];
          sell = price[sellt];
          margin = newMargin;
          DEBUG && console.log({case2:{margin, buyt, sellt, buy, sell}});
        }

      // case 3
        if ( spot < price[lessert] ) {
          lessert = i;
          DEBUG && console.log({case3:{lessert}});
        }
    }

  }

  return [buy, sell]; 
};

console.log(findBuySellStockPrices([ 1, 2, 3, 4, 3, 2, 1, 2, 5 ]));
console.log(findBuySellStockPrices([ 8, 5, 12, 9, 19, 1 ]));
console.log(findBuySellStockPrices([ 21, 12, 11, 9, 6, 3 ]));
console.log(findBuySellStockPrices([ 8, 6, 5, 4, 3, 2, 1 ]));


