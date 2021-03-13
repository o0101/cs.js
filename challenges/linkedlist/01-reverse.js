import {
  LinkedListNode,
  createRandomLinkedList,
  display
} from './lib.js';

test();

function reverse(head) {
  let lastNode = null;
  let node = head;

  while(node) {
    const next = node.next; 
    node.next = lastNode;
    lastNode = node;
    node = next;
  }

  return lastNode;
}

function recursiveReverse(head) {
  if ( ! head ) return head;

  console.log(head.data);

  if ( ! head.next ) {
    return head;
  }

  return recursiveReverse(head.next);
}

function test() {
  let runs = 5;
  do {
    console.log(`${runs} runs remaining...`);
    let list = createRandomLinkedList(10);
    console.log(`Before reversal: ${display(list)}`);

    list = reverse(list);

    console.log(`After reversal: ${display(list)}`);

    console.log(`Recursive:`);
    recursiveReverse(list);
  } while(--runs);

  console.log(`Done!`);
}

