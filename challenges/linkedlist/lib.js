export let LinkedListNode = function(data){
	this.data = data;
  this.next = null;
}

export let insertAtHead = function(head, data) {
  let newNode = new LinkedListNode(data);
  newNode.next = head;
  return newNode;
}

export let getIth = function(head, i) {
  let node = head;

  while(i--) {
    if ( ! node ) break;
    node = node.next; 
  }

  return node;
}

export let length = function(head) {
  let node = head;
  let i = 0;

  while(node && node.next) {
    i++;
    node = node.next; 
  }

  return i;
}

export let insertAtTail = function(head, node) {
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

export let createRandomLinkedList = function(length) {
  let listHead = null;
  for (let i = 0; i < length; i++) {
    listHead = insertAtHead(listHead, Math.floor(Math.random() * 100 + 1));
  }
  return listHead;
}

export let createLinkedList = function(lst) {
  let listHead = null;
  lst.reverse();
  for (let x = 0; x < lst.length; x++) {
    listHead = insertAtHead(listHead, lst[x]);
  }
  return listHead;
}

export let display = function(head) {
  let temp = head;
  let s = "";
  //let max = 11;
  while (temp) {
    s += temp.data;
    temp = temp.next;
    if (temp) {
      s += ", ";
    }
    //console.log('ok', temp);
    //if ( max <= 0 ) break;
  }
  return s;
};
