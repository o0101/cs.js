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
  randomNumber,
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

      const randomList1 = randomNumberList(20)
      const list1 = createLinkedList(randomList1);

      const nodes = [];
      let node = list1;

      while(node) {
        nodes.push(node);
        node = node.next;
      }

      node = list1;

      while(node) {
        node.arbitrary = randomItem(nodes);
        node = node.next;
      } 

      console.log(`List1: ${display(list1)}`);

      const copy = deepCopy(list1);

      console.log(`Copy: ${display(copy)}`);

      console.log('\n');
    } while(--runs);

    console.log(`Done!`);
  }

  // this is my first solution. Seemed obvious
  // Will be an O(N) where N is Max(ord(a),ord(b))
	function deepCopy(head) {
		if ( ! head ) return;

		const map = new Map();
		const copy = new LinkedListNode();

		let curr = head;
		let copy_curr = copy;

		// copy the nodes
		while(curr) {
			copy_curr.data = curr.data;

			map.set(curr, copy_curr);

			curr = curr.next;

			if ( curr ) {
				copy_curr.next = new LinkedListNode();
				copy_curr = copy_curr.next;
			}
		}

		// point the copy's pointers to the copied nodes
		curr = head;
		while(curr) {
			const copy_curr = map.get(curr);

			copy_curr.arbitrary = map.get(curr.arbitrary);

			curr = curr.next;
		}

		return copy;
  }
}



