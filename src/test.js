import {execSync} from 'child_process';
import * as CS from './index.js';

const AS_TREE_SCALE_TEST_MAX = 1000;
const AS_LIST_SCALE_TEST_MAX = 10000000;
testAll();

export default {
  testAll
};

export function testAll() {
  testHeapAsTree();
  testHeapAsList();
  scaleTest();
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
