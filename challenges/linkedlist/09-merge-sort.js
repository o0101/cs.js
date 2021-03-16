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

      const randomList = randomNumberList(21);
      const list = createLinkedList(randomList);

      console.log(`Before sort: ${display(list)}`);

      const sortedList = mergeSort(list);

      console.log(`After sort: ${display(sortedList)}`);

      console.log('\n');
    } while(--runs);

    console.log(`Done!`);
  }

  // Will be an O(n log n)
  function mergeSort(a) {
    if ( !a || ! a.next ) {
      return a;
    }

    const len = length(a);
    const half = len>>1;
    const leftEnd = getIth(a, half-1);
    const rightStart = leftEnd.next;

    leftEnd.next = null;

    //console.log({len, half, lena: length(a), leftEnd:leftEnd.data, rightStart:rightStart.data});

    const left = mergeSort(a);
    const right = mergeSort(rightStart);
    return mergeSorted(left, right);
  }
}



