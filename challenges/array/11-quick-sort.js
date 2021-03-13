let quickSort = a => {
  return recursiveQuickSort(a, 0, a.length - 1);
};

let a = [55, 23, 26, 2, 18, 78, 23, 8, 2, 3]

console.log("Before Sorting")
console.log(a);

quickSort(a);

console.log("After Sorting")
console.log(a);

function recursiveQuickSort(list, low, high) {
  if ( low < high ) {
    const p = partition(list, low, high);
    recursiveQuickSort(list, low, p - 1);
    recursiveQuickSort(list, p + 1, high);
  }
  return list;
}
// simple pivot using O(n) extra space
// sophisticated partition
function partition(list, low, high, pivot) {
  if ( pivot !== undefined ) {
    swap(list, pivot, high);
  }
  const pivotItem = list[high];

  let s = low;

  for( let i = low; i < high; i++ ) {
    if ( list[i] <= pivotItem ) {
      swap(list, s, i);
      s++;
    }
  }

  swap(list, s, high);

  return s;
}

function swap(list, i, j) {
  const temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}
