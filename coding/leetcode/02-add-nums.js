class LinkedListNode {
  constructor() {
    this.val = null;
    this.next = null;
  }
}
var addTwoNumbers =   function addWithCarry(a, b, radix = 10) {
  // heads point to least significant unit

  const sum = new LinkedListNode();
  const update = () => {
    curr.next = new LinkedListNode(); 
    curr = curr.next;
  };
  let curr = sum;
  let carry = 0;

  while(a || b || carry) {
    const pointSum = carry + (a ? parseInt(a.val) : 0) + (b ? parseInt(b.val) : 0)
    const sumUnit = pointSum % radix; 
    const sumCarry = (pointSum - sumUnit)/radix;
    carry = sumCarry;

    curr.val = sumUnit;

    if ( a ) {
      a = a.next;
    }

    if ( b ) {
      b = b.next;
    }

    if (a || b || carry) {
      update(); 
    }
  }

  return sum; 
}
