import {
  LinkedListNode,
  createLinkedList,
  display
} from './lib.js';
import {
  randomNumberList,
  randomItem
} from '../../src/test.js';

test();

function test(){
  test1();
  test2();
  test3();
}

function test1() {
  let runs = 5;
  do {
    console.log(`\n${runs} runs remaining...`);
    const randomList = randomNumberList(30);
    let key = randomItem(randomList);
    let list = createLinkedList(randomList);
    //const key = pickRandomNode(list).data;
    console.log(`Before delete: ${display(list)}`);

    if (runs === 1) {
      key = 0;
    }

    console.log(`Key to delete: ${key}`);

    list = deleteKey(list, key);

    console.log(`After delete: ${display(list)}`);
  } while(--runs);

  console.log(`Done!`);
}

function test2() {
  let key = 0;
  let list = createLinkedList([1,2,3,0,1,2,3,0,5,6,7,0,0,0,9,9,9,0,0,0]);
  //const key = pickRandomNode(list).data;
  console.log(`\nBefore delete: ${display(list)}`);

  console.log(`Key to delete: ${key}`);

  list = deleteKey(list, key);

  console.log(`After delete: ${display(list)}`);
}

function test3() {
  let key = 1;
  let list = createLinkedList([1,1,1,1,2,3,0,1,2,3,0,5,6,7,0,0,0,9,9,9,0,0,0]);
  //const key = pickRandomNode(list).data;
  console.log(`\nBefore delete: ${display(list)}`);

  console.log(`Key to delete: ${key}`);

  list = deleteKey(list, key);

  console.log(`After delete: ${display(list)}`);
}

// O(n) algorithm below, with O(1) space
function deleteKey(head, key) {
  let lastNode = null;
  let node = head;

  while(node) {
    if ( key === node.data ) {
      if ( lastNode ) {
        lastNode.next = node.next;
      } else if ( head === node ) {
        head = node.next;
      }
    } else {
      // careful here, only update lastNode if we did not delete node!
      // otherwise the last, lastNode = node node will still be in list
      lastNode = node;
    }
    node = node.next;
  }

  return head;
}
