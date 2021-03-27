import {
  LinkedListNode,
  getIth,
  length,
  insertAtTail,
  createLinkedList,
  display
} from './lib.js';
import {
  randomNumberList,
  randomItem
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
      const randomList1 = randomNumberList(21);
      const randomList2 = randomNumberList(7);
      const list1 = createLinkedList(randomList1);
      const list2 = createLinkedList(randomList2);
      const part1 = getIth(list1, 7);

      let point = intersectionPoint(list1,list2);

      console.log(`Before intersecting:`);
      console.log(`List1: ${display(list1)}`);
      console.log(`List2: ${display(list2)}`);
      console.log(`Intersection point: ${point && point.data}`);

      console.log(`\nWill intersect from list1 node: ${part1.data}`);
      insertAtTail(list2, part1);

      point = intersectionPoint(list1,list2);

      console.log(`\nAfter intersecting:`);
      console.log(`List1: ${display(list1)}`);
      console.log(`List2: ${display(list2)}`);
      console.log(`Intersection point: ${point && point.data}`);

      if ( point === undefined ) {
        console.error(`Test failed.`);
      }

      console.log('\n');
    } while(--runs);

    console.log(`Done!`);
  }

  // An O(A + B) time O(1) space solution
  // I only got this once I got the hint "get length of both lists"
  // before that I had NO IDEA! :p :) xx hahaah
  function intersectionPoint(a, b) {
    const A = length(a);
    const B = length(b);

    let longer, shorter, i;

    if ( A > B ) {
      longer = a;
      shorter = b;
      i = A-B;
    } else if ( A < B ) {
      longer = b;
      shorter = a;
      i = B-A;
    } else {
      longer = a;
      shorter = b;
      i = 0;
    }

    longer = getIth(longer, i);

    while(longer && shorter) {
      if ( longer === shorter ) {
        return shorter;
      } 
      longer = longer.next;
      shorter = shorter.next;
    }
  }
}

