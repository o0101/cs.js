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

      console.log(`Before reverse-k: ${display(list)}`);
      console.log(`k: ${randomRotation}`);

      const kReversedList = reverseChunks(list, randomRotation);

      console.log(`After reverse-k: ${display(kReversedList)}`);

      console.log('\n');
    } while(--runs);

    console.log(`Done!`);
  }

  // Will be an O(n log n)
  function reverseChunks(a, k = 2) {
    if ( !a || ! a.next || k <= 1 ) {
      return a;
    }

    let newHead;
    let prior;
    let fore = a;
    let aft = a;

    while(fore) {
      let i = k-1; // k-1 because fore is already the first 1
      while(i-- && fore.next) {
        fore = fore.next;
      }
      //console.log({fore,k});

      const next = fore.next;

      reverseInterval(fore, aft);

      if ( ! newHead ) {
        newHead = fore;
      } else if ( prior ) {
        prior.next = fore;
      }

      aft.next = next;

      prior = aft;

      fore = next;
      aft = next;
    }

    return newHead;
  }

  function reverseInterval(tail, head) {
    let prior;
    let node = head;
  
    while(node && node !== tail) {
      const {next} = node;
      node.next = prior;
      prior = node;
      node = next;
    }

    tail.next = prior;
  }
}



