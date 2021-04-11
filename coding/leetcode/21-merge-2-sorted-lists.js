/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let head;
  let curr;
  
  if ( ! l1 ) return l2;
  if ( ! l2 ) return l1;
  
  if ( l1.val < l2.val ) {
    head = l1;
    l1 = l1.next;
  } else {
    head = l2;
    l2 = l2.next;
  }
  
  curr = head;
  
  while(l1 || l2) {
    if ( l1 && l2 ) {
      if ( l1.val < l2.val ) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
    } else if ( l1 ) {
      curr.next = l1;
      l1 = l1.next;
    } else if ( l2 ) {
      curr.next = l2;
      l2 = l2.next;
    }
    
    curr = curr.next;

  } 
  
  return head;
  
};
