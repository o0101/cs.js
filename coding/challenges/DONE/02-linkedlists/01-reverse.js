import {
  LinkedListNode,
  createRandomLinkedList,
  display
} from './lib.js';

test();
testRecursive();

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
  if ( ! head.next ) {
    return head;
  }

  const val = recursiveReverse(head.next);

  head.next.next = head;
  head.next = null;

  return val;
}

function test() {
  let runs = 5;
  do {
    console.log(`${runs} runs remaining...`);
    let list = createRandomLinkedList(10);
    console.log(`Before reversal: ${display(list)}`);

    list = reverse(list);

    console.log(`After reversal: ${display(list)}`);
  } while(--runs);

  console.log(`Done!`);
}

function testRecursive() {
  let runs = 5;
  do {
    console.log(`${runs} runs remaining...`);
    let list = createRandomLinkedList(10);
    console.log(`Before reversal: ${display(list)}`);

    list = recursiveReverse(list);

    console.log(`After recursive reversal: ${display(list)}`);
  } while(--runs);

  console.log(`Done!`);
}

