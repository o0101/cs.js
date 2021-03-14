import {
  LinkedListNode,
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
    test1();
  }

  function test1() {
    let runs = 5;
    do {
      console.log(`\n${runs} runs remaining...`);
      const randomList = randomNumberList(30);
      let list = createLinkedList(randomList);
      console.log(`Before insertion sort: ${display(list)}`);

      list = insertionSort(list);

      console.log(`After insertion sort: ${display(list)}`);
    } while(--runs);

    console.log(`Done!`);
  }

  // O(n**2) algorithm below, with O(1) space
  // my original solution
  function insertionSort(head) {
    let priorNode = head;

    if ( !head ) return;

    let node = head.next;

    while(node) {
      // save data for convenience and next because it may be overwritten
      const {data,next} = node;

      let alreadyInOrder = true;

      // insert
        let priorINode;
        let inode = head;
        while(inode !== node) {
          if ( inode.data <= data ) {
            priorINode = inode;
            inode = inode.next; 
          } else {
            // splice out
            priorNode.next = node.next;

            // splice in
            if ( priorINode ) {
              priorINode.next = node;
            } else {
              head = node;
            }
            node.next = inode;

            // dont update outerloop pointers
            alreadyInOrder = false;

            // slot found
            break;
          }
        }

      // if we didn't move it, then we can update priorNode
        // if we moved it already, node would no longer be the predecessor of
        // its original node.next, so we couldn't call it priorNode 
        // because it wouldn't be
      if ( alreadyInOrder ) {
        priorNode = node;
      }
      node = next;
    }

    return head;
  }
}


{
  //test();

  function test(){
    test1();
  }

  function test1() {
    let runs = 5;
    do {
      console.log(`\n${runs} runs remaining...`);
      const randomList = randomNumberList(30);
      let list = createLinkedList(randomList);
      console.log(`Before insertion sort: ${display(list)}`);

      list = insertionSort(list);

      console.log(`After insertion sort: ${display(list)}`);
    } while(--runs);

    console.log(`Done!`);
  }

  // O(n**2) algorithm below, with O(1) space
  // my original solution
  function insertionSort(head) {
    let priorNode = head;

    if ( !head ) return;

    let node = head.next;

    while(node) {
      // save data for convenience and next because it may be overwritten
      const {data,next} = node;

      let alreadyInOrder = true;

      // insert
        let priorINode;
        let inode = head;
        while(inode !== node) {
          if ( inode.data <= data ) {
            priorINode = inode;
            inode = inode.next; 
          } else {
            // splice out
            priorNode.next = node.next;

            // splice in
            if ( priorINode ) {
              priorINode.next = node;
            } else {
              head = node;
            }
            node.next = inode;

            // dont update outerloop pointers
            alreadyInOrder = false;

            // slot found
            break;
          }
        }

      // if we didn't move it, then we can update priorNode
        // if we moved it already, node would no longer be the predecessor of
        // its original node.next, so we couldn't call it priorNode 
        // because it wouldn't be
      if ( alreadyInOrder ) {
        priorNode = node;
      }
      node = next;
    }

    return head;
  }
}
