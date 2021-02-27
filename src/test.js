import * as CS from './index.js';

const AS_TREE_SCALE_TEST_MAX = 1000;
const AS_LIST_SCALE_TEST_MAX = 10000000;
const ORDER_TEST_MAX = 1000;
const ORDER_TEST_RUNS = 3;

testAll();

export default {
  testAll
};

export function testAll() {
  console.log({mainExport:CS});
  testHeapAsTree();
  testHeapAsList();
  scaleTest();
  orderTest({max:true, arity:2});
  orderTest({max:true, arity:4});
  orderTest({max:true, arity:8});
  orderTest({max:true, arity:5});
  orderTest({max:false, arity:2});
  orderTest({max:false, arity:4});
  orderTest({max:false, arity:8});
  orderTest({max:false, arity:5});
  orderTest({asTree: false, max:true, arity:2});
  orderTest({asTree: false, max:true, arity:4});
  orderTest({asTree: false, max:true, arity:8});
  orderTest({asTree: false, max:true, arity:5});
  orderTest({asTree: false, max:false, arity:2});
  orderTest({asTree: false, max:false, arity:4});
  orderTest({asTree: false, max:false, arity:8});
  orderTest({asTree: false, max:false, arity:5});
}

function testHeapAsTree() {
  const newHeap = CS.Heap.create();
  console.log('New heap');
  CS.Heap.Class.print(newHeap);

  console.log('Push 1');
  newHeap.push(1);
  CS.Heap.Class.print(newHeap);

  console.log('Push 2');
  newHeap.push(2);
  CS.Heap.Class.print(newHeap);

  console.log('Push 4');
  newHeap.push(4);
  CS.Heap.Class.print(newHeap);

  console.log('Push 3');
  newHeap.push(3);
  CS.Heap.Class.print(newHeap);

  console.log('Push 0');
  newHeap.push(0);
  CS.Heap.Class.print(newHeap);

  console.log('findMax');
  console.log({max:newHeap.peek()});
  console.log();

  console.log('Pop');
  newHeap.pop();
  CS.Heap.Class.print(newHeap);

  console.log('Push 1');
  newHeap.push(1);
  CS.Heap.Class.print(newHeap);

  console.log('findMax');
  console.log({max:newHeap.peek()});
  console.log();

  console.log('Replace max with 5');
  newHeap.replace(5);
  CS.Heap.Class.print(newHeap);

  console.log('findMax');
  console.log({max:newHeap.peek()});
  console.log();
}

function testHeapAsList() {
  const newHeap = CS.Heap.create({asTree:false});
  console.log('New heap');
  CS.Heap.Class.print(newHeap);

  console.log('Push 1');
  newHeap.push(1);
  CS.Heap.Class.print(newHeap);

  console.log('Push 2');
  newHeap.push(2);
  CS.Heap.Class.print(newHeap);

  console.log('Push 4');
  newHeap.push(4);
  CS.Heap.Class.print(newHeap);

  console.log('Push 3');
  newHeap.push(3);
  CS.Heap.Class.print(newHeap);

  console.log('Push 0');
  newHeap.push(0);
  CS.Heap.Class.print(newHeap);

  console.log('findMax');
  console.log({max:newHeap.peek()});
  console.log();

  console.log('Pop');
  newHeap.pop();
  CS.Heap.Class.print(newHeap);

  console.log('Push 1');
  newHeap.push(1);
  CS.Heap.Class.print(newHeap);

  console.log('findMax');
  console.log({max:newHeap.peek()});
  console.log();

  console.log('Replace max with 5');
  newHeap.replace(5);
  CS.Heap.Class.print(newHeap);

  console.log('findMax');
  console.log({max:newHeap.peek()});
  console.log();
}

function scaleTest() {
  {
    console.group(`Scale test heap as tree...`);
    console.time(`Heap As Tree ${AS_TREE_SCALE_TEST_MAX} insertions`);
    const newHeapAsTree = CS.Heap.create({max:true, arity:8});
    let max = -Infinity, min = Infinity;
    for( let i = 0; i < AS_TREE_SCALE_TEST_MAX; i++) {
      const randomNumber = Math.floor(Math.random()*AS_TREE_SCALE_TEST_MAX);
      newHeapAsTree.push(randomNumber);
      if ( randomNumber > max ) {
        max = randomNumber;
      } 
      if ( randomNumber < min ) {
        min = randomNumber;
      }
    }
    console.log({size:newHeapAsTree.size, heapTop:newHeapAsTree.peek(), actual: {min, max}});
    console.timeEnd(`Heap As Tree ${AS_TREE_SCALE_TEST_MAX} insertions`);
    console.groupEnd(`Done!`);
  }

  {
    console.group(`Scale test heap as list...`);
    console.time(`Heap As List ${AS_LIST_SCALE_TEST_MAX} insertions`);
    const newHeapAsList = CS.Heap.create({asTree:false,max:true, arity:8});
    let max = -Infinity, min = Infinity;
    for( let i = 0; i < AS_LIST_SCALE_TEST_MAX; i++) {
      const randomNumber = Math.floor(Math.random()*AS_LIST_SCALE_TEST_MAX);
      newHeapAsList.push(randomNumber);
      if ( randomNumber > max ) {
        max = randomNumber;
      } 
      if ( randomNumber < min ) {
        min = randomNumber;
      }
    }
    console.log({size: newHeapAsList.size, heapTop:newHeapAsList.peek(), actual:{min, max}});
    console.timeEnd(`Heap As List ${AS_LIST_SCALE_TEST_MAX} insertions`);
    console.groupEnd(`Done!`);
  }
}

function orderTest(opts) {
  console.log(`\n`);
  console.group(`Order test testing opts: ${JSON.stringify(opts)}`);
  let valid = true;
  let violations = 0;

  for( let r = 0; r < ORDER_TEST_RUNS; r++ ) {
    console.log(`Run: ${r+1}`);
    const heap = CS.Heap.create(opts);
    let last = heap.config.max ? Infinity : -Infinity;

    for( let i = 0; i < ORDER_TEST_MAX; i++ ) {
      heap.push(randomNumber(ORDER_TEST_MAX));
    }

    while(heap.size) {
      const next = heap.pop();
      if ( heap.config.max ) {
        valid = valid && (next <= last);
      } else {
        valid = valid && (next >= last);
      }

      if ( ! valid ) {
        console.log(`Heap property violation: ${last} -> ${next} does not satisfy ${
          heap.config.max ? 'max' : 'min'
        }`);
        violations ++;
      }

      last = next;
    }

    console.log(`End Run: ${r+1}`);
  }

  console.log(`Total ${violations} heap property violations across ${
    ORDER_TEST_RUNS
  } runs.`);

  if ( valid ) {
    console.log(`Test passed.`);
  } else {
    console.error(`Test failed.`);
  }

  console.log(`\n`);
  console.groupEnd();

  return valid;
}

function randomNumber(n) {
  return Math.floor(Math.random()*n);
}
