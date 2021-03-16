import {
  LinkedListNode,
  getIth,
  length,
  insertAtTail,
  mergeSorted,
  createLinkedList,
  display
} from './lib.js';
import {
  randomNumberList,
  randomNumber
} from '../../src/test.js';

{
  test();

  function test(){
    console.log(`\nTest at: ${new Date}`);
    test1();
  }

  function test1() {
    let runs = 5;

    do {
      console.log(`\n\n${runs} runs remaining...\n`);

      const randomList = randomNumberList(21);
      const randomRotation = randomNumber(21);
      const list = createLinkedList(randomList);

      console.log(`Before rotation: ${display(list)}`);
      console.log(`Rotate by: ${randomRotation}`);

      const rotatedList = rotate(list, randomRotation);

      console.log(`After rotation: ${display(rotatedList)}`);

      console.log('\n');
    } while(--runs);

    console.log(`Done!`);
  }

  // Will be an O(n log n)
  function rotate(a, k) {
    if ( !a || ! a.next ) {
      return a;
    }

    const len = length(a);
    k = k % len;
    if ( k < 0 ) {
      k += len;
    }

    if ( k === 0 ) {
      return a;
    }

    // convert to a left rotate (just easier for me to think about)
    const leftRotate = len-k;


    // get the node before the new head (this node, will become the new tail)
    const newTail = getIth(a, leftRotate - 1);
    // get the new head
    const newHead = newTail.next;
    // set the old head 
    let head = a;

    // find  the old tail
    let oldTail = newHead;
    while(oldTail && oldTail.next) {
      oldTail = oldTail.next;
    }

    // connect the old tail to the old head
    oldTail.next = head;


    // disconnect the new tail from the new head
    newTail.next = null;

    // return the new head
    return newHead;
  }
}



