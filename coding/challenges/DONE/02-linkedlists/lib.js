export function LinkedListNode(data){
	this.data = data;
  this.next = null;
}

export function insertAtHead(head, data) {
  let newNode = new LinkedListNode(data);
  newNode.next = head;
  return newNode;
}

export function getIth1(head, i) {
  let node = head;

  let j = 1;
  while(j < i) {
    if ( ! node ) break;
    node = node.next; 
    j++;
  }

  return node;
}

export function getIth(head, i) {
  let node = head;

  while(i--) {
    if ( ! node ) break;
    node = node.next; 
  }

  return node;
}

export function length(head) {
  let node = head;
  let i = 0;

  while(node) {
    i++;
    node = node.next; 
  }

  return i;
}

export function insertAtTail(head, node) {
	if (!head) {
		return node;
	}

	let temp = head;

	while (temp.next) {
		temp = temp.next;
	}

	temp.next = node;
	return head;
}

export function createRandomLinkedList(length) {
  let listHead = null;
  for (let i = 0; i < length; i++) {
    listHead = insertAtHead(listHead, Math.floor(Math.random() * 100 + 1));
  }
  return listHead;
}

export function createLinkedList(lst) {
  let listHead = null;
  lst.reverse();
  for (let x = 0; x < lst.length; x++) {
    listHead = insertAtHead(listHead, lst[x]);
  }
  return listHead;
}

export function display(head, DEBUG = 0) {
  let temp = head;
  let s = "";
  let max = DEBUG;
  while (temp) {
    s += temp.data;
    temp = temp.next;
    if (temp) {
      s += ", ";
    }
    if ( DEBUG ) {
      console.log('ok', temp);
      if ( max-- <= 0 ) break;
    }
  }
  return s;
};

export function mergeSorted(a,b) {
  let head;
  let node;
  let smallest;

  while(a && b) {

    if ( a.data < b.data ) {
      smallest = a;
      a = a.next;
    } else {
      smallest = b;
      b = b.next;
    }

    if ( ! node ) {
      node = smallest;
      head = node;
    } else {
      node.next = smallest;
      node = smallest;
    }
  }

  while ( a ) {
    smallest = a;
    if ( ! node ) {
      node = smallest;
      head = node;
    } else {
      node.next = smallest;
      node = smallest;
    }
    a = a.next;
  }

  while ( b ) {
    smallest = b;
    if ( ! node ) {
      node = smallest;
      head = node;
    } else {
      node.next = smallest;
      node = smallest;
    }
    b = b.next;
  }

  return head;
}
