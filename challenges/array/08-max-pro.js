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
max = [5 - 1, 1, 5]
// I think you can do this with no backtracking and no extra steps
// if you just check that nothing is less than buy. If something is less than buy, then 
// and if something is greater than sell then update sell to that, but i sense this will
// miss a few cases
// maybe i work it by hand


