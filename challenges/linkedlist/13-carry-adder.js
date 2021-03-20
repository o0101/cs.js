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

      const randomList1 = randomNumberList(3).map(() => randomNumber(10));
      const randomList2 = randomNumberList(3).map(() => randomNumber(10));
      const list1 = createLinkedList(randomList1);
      const list2 = createLinkedList(randomList2);

      console.log(`List1: ${display(list1)}`);
      console.log(`List2: ${display(list2)}`);

      const sum = addWithCarry(list1, list2);

      console.log(`Sum: ${display(sum)}`);

      console.log('\n');
    } while(--runs);

    console.log(`Done!`);
  }

  // this is my first solution. Seemed obvious
  // Will be an O(N) where N is Max(ord(a),ord(b))
  function addWithCarry(a, b, radix = 10) {
    // heads point to least significant unit

    const sum = new LinkedListNode();
    const update = () => {
      curr.next = new LinkedListNode(); 
      curr = curr.next;
    };
    let curr = sum;
    let carry = 0;

    while((a && b) || carry) {
      const pointSum = carry + (a ? parseInt(a.data) : 0) + (b ? parseInt(b.data) : 0)
      const sumUnit = pointSum % radix; 
      const sumCarry = (pointSum - sumUnit)/radix;
      carry = sumCarry;

      curr.data = sumUnit;

      if ( a ) {
        a = a.next;
      }

      if ( b ) {
        b = b.next;
      }

      if ((a && b) || carry) {
        update(); 
      }
    }

    return sum; 
  }
}



