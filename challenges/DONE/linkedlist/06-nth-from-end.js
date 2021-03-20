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
      const list = createLinkedList(randomList);
      const n = 3;
      const answerData = randomList[n-1];

      let nthFromEndData = nthFromEnd(list,n);

      console.log(`List1: ${display(list)}`);
      console.log(`Answer data ${n}th from end node: ${answerData}`);
      console.log(`Nth from end: ${nthFromEndData}`);

      console.log('\n');
    } while(--runs);

    console.log(`Done!`);
  }

  // An O(A + B) time O(1) space solution
  // I only got this once I got the hint "get length of both lists"
  // before that I had NO IDEA! :p :) xx hahaah
  function nthFromEnd(list, n) {
    const len = length(list);
    const indexOfNthFromEnd = len - n;

    const node = getIth(list, indexOfNthFromEnd);

    return node.data;
  }
}

// The official solution, use two pointers
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
      const list = createLinkedList(randomList);
      const n = 3;
      const answerData = randomList[n-1];

      let nthFromEndData = nthFromEnd(list,n);

      console.log(`List1: ${display(list)}`);
      console.log(`Answer data ${n}th from end node: ${answerData}`);
      console.log(`Nth from end: ${nthFromEndData}`);

      console.log('\n');
    } while(--runs);

    console.log(`Done!`);
  }

  // An O(A + B) time O(1) space solution
  // I only got this once I got the hint "get length of both lists"
  // before that I had NO IDEA! :p :) xx hahaah
  function nthFromEnd(list, n) {
    let head = list;
    let tail = head;

    let i = 0;
    while(tail) {
      if ( i >= n ) break;
      tail = tail.next;
      i++;
    }

    if ( i < n ) return null;

    while(head && tail) {
      head = head.next;
      tail = tail.next;
    }

    if ( head ) return head.data;
  }
}

