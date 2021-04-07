var removeNthFromEnd = function(head, n) {
  const newList = head;
  let prev;
  frontier = head; 
  while(n--) frontier = frontier.next;
  
  while(frontier) {
    prev = head;
    head = head.next;
    frontier = frontier.next;
  }
  
  
  if ( ! prev ) {
    return newList.next;
  } else {
    prev.next = head.next; 
  }
  
  return newList;
};
