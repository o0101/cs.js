/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  return reverseChunks(head, k);   
};

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
      //console.log(i,k,fore.val);
      if ( i >= 0 ) break;
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
