// This iterative in order is interesting
// below is my first solution
// using two stacks that I kind of crafted and hacked out by hand
// but I'd prefer a simpler solution
// that I felt sure would work in every case (this one I'm not!)

let InorderIterator = class InorderIterator {
  constructor(root) {
    this.addLeft = [root];
    this.addRight = [];
  }
  hasNext() {
   return this.addLeft.length || this.addRight.length;
  }
  // getNext returns null if there are no more elements in tree
  getNext() {
    //console.log({left:this.addLeft.map(n => n.data), right:this.addRight.map(n => n.data)});
    if ( this.addLeft.length ) {
      let node = this.addLeft.pop();
      while(node.left) {
        this.addRight.push(node);
        if ( node.left ) {
          this.addLeft.push(node.left);
        }
        node = this.addLeft.pop();
      }
      if ( node.right ) {
        this.addRight.push(node.right);
      }
      //console.log({node:node.data});
      return node;
    } else if ( this.addRight.length ) {
      let node = this.addRight.pop();
      if ( node.right ) {
        this.addLeft.push(node.right);
      }
      //console.log({node:node.data});
      return node;
    }
  }
}

// Below is my second solution I created after reading about their solution
// using a pre-prepared single stack
InorderIterator = class InorderIterator {
  constructor(root) {
    this.stack = [...allLeft(root)];
  }
  hasNext() {
    return this.stack.length > 0;
  }
  // getNext returns null if there are no more elements in tree
  getNext() {
    const node = this.stack.pop();
    if ( node.right ) {
      this.stack.push(...allLeft(node.right));
    }
    return node;
  }
}

function allLeft(node) {
  const list = [node];
  while(node.left) {
    node = node.left
    list.push(node);
  }
  return list;
}

let inorderUsingIterator = function(root) {
  displayLevelOrder(root);
  let iter = new InorderIterator(root);
  let result_str = '';
  while (iter.hasNext()) {
    let ptr = iter.getNext();
    result_str += ptr.data + ' ';
  }
  return result_str;
};

