import {
  LinkedListNode,
  getIth1,
  length,
  insertAtTail,
  createLinkedList,
  display
} from './lib.js';
import {
  randomNumberList,
  randomItem
} from '../../src/test.js';

// My first solution. Just scans the lists to get length, calculate index then gets that
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
      randomList.sort((a,b) => Math.sign(a-b));
      const list = createLinkedList(randomList);
      const randomList2 = randomNumberList(21);
      randomList2.sort((a,b) => Math.sign(a-b));
      const list2 = createLinkedList(randomList2);

      console.log(`List 1: ${display(list)}`);
      console.log(`List 2: ${display(list2)}`);

      const mergedList = mergeSorted(list,list2);

      console.log(`Merged list: ${display(mergedList)}`);

      console.log('\n');
    } while(--runs);

    console.log(`Done!`);
  }

  // An O(A + B) time O(1) space solution
  // I only got this once I got the hint "get length of both lists"
  // before that I had NO IDEA! :p :) xx hahaah
  function mergeSorted(a,b) {
    let head;
    let node;
    let smallest;

    while(a && b) {

      if ( a.data < b.data ) {
        smallest = a;
        a = a.next;
      } else {
        smallest = b;
        b = b.next;
      }

      if ( ! node ) {
        node = smallest;
        head = node;
      } else {
        node.next = smallest;
        node = smallest;
      }
    }

    while ( a ) {
      smallest = a;
      if ( ! node ) {
        node = smallest;
        head = node;
      } else {
        node.next = smallest;
        node = smallest;
      }
      a = a.next;
    }

    while ( b ) {
      smallest = b;
      if ( ! node ) {
        node = smallest;
        head = node;
      } else {
        node.next = smallest;
        node = smallest;
      }
      b = b.next;
    }

    return head;
  }
}


