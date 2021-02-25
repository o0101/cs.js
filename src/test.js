import {execSync} from 'child_process';
import * as CS from './index.js';

testAll();

export default {
  testAll
};

export function testAll() {
  testHeapAsTree();
  testHeapAsList();
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
