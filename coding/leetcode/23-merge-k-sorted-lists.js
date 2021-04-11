/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if ( !lists.length ) {
    return null;
  }
  if ( lists.length === 1 ) {
    return lists[0];
  }
  lists = lists.filter(list => !!list);
  lists = lists.sort((a,b) => Math.sign(a.val - b.val));
  // strategy: probably move smallest list to head
  let newHead = null;
  let curr;
  let minListI = 0;
  while(lists.length) {
    let minHead, minVal = Infinity, minI;
    if ( lists.length > 1 ) {
      let j = 1;
      while ( lists[0].val > lists[j].val ) {
        j++; 
        if ( j >= lists.length ) break;
      }
      const oldHead = lists.splice(0,1);
      lists.splice(j-1,0,...oldHead);
    }
    minHead = lists[0];
    if ( minHead && minHead.next ) {
      lists[0] = minHead.next;           
    } else {
      lists.splice(0,1); // we finished that list
    }
    if ( ! minHead ) break;
    if ( ! curr ) {
      curr = minHead;
      newHead = curr;
    }
    curr.next = minHead;
    curr = minHead;
    //console.log({lists,curr,newHead});
  }
  if ( curr ) {
    curr.next = null;
  }
  return newHead;
};
