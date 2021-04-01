import {
  LinkedListNode,
  createRandomLinkedList,
  display
} from './lib.js';

test();

function test() {
  let runs = 5;
  do {
    console.log(`\n${runs} runs remaining...`);
    let list = createRandomLinkedList(100);
    console.log(`Before dedupe: ${display(list)}`);

    list = dedupe(list);

    console.log(`After dedupe: ${display(list)}`);
  } while(--runs);

  console.log(`Done!`);
}

// O(n) algorithm below, with O(n) space
  // if O(1) space is desired two approaches are possible:
    // 1 - Sort first, and then remove dupes in linear scan O(n log n)
    // 2 - For each node, scan the nodes before it to see if it occured before. O(n**2)
function dedupe(head) {
  const values = new Set();
  let lastNode = null;
  let node = head;

  while(node) {
    if ( values.has(node.data) ) {
      if ( lastNode ) {
        lastNode.next = node.next;
      }
    } else {
      values.add(node.data);
    }
    lastNode = node;
    node = node.next;
  }

  return head;
}
