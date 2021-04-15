/**
	My first solution.

  Each step:
  - Search for d in root
  - Get that node
  - Also set up parents
  - Then go up parent chain to find smallest parent larger than d if no right
  - Else go down the right chain at the left to find smallest guy above d

  Seems I can simplify the first phase:
  Search, can probably be DFS which will store the parent chain.
  So I can basically find the successor and find d in parent chain in 1 step. 
  But if it has a right path then I just find d.

  Oh shit and I can also find d without DFS, just using the BS since it's a BST! 

**/
let inorderSuccessorBST = function(root, d) {
  let val = d;
    const stack = [root];
    while(stack.length) {
      const node = stack.pop();
      if ( node.data == val ) {
        d = node;
      }
      if ( node.left ) {
        node.left.parent = node;
        stack.push(node.left);
      }
      if ( node.right ) {
        node.right.parent = node;
        stack.push(node.right);
      }
    }
  if ( ! d ) return;
  if ( d.right ) {
    console.log('x',d.data,d.right.data);
    d = d.right;
    while(d.left && (d.left.data > val)) {
      d = d.left;
    }
    return d.left || d;
  } else if ( d.parent ) {
    console.log('y',d.data,d.parent.data);
    while(d.parent && (d.parent.data < d.data)) {
      d = d.parent;
    }
    return d.parent;
  }
};

/**

below is my second solution I created after looking at their solution

**/
inorderSuccessorBST = function(root, d) {
  let parent;
  let node = root;
  while(true) {
    if ( node.data === d ) {
      break;
    } else if (d < node.data) {
      parent = node;
      node = node.left;
    } else {
      node = node.right;
    }
  }
  if ( ! node ) return;
  if ( d.right ) {
    d = d.right;
    while(d.left) {
      d = d.left;
    }
    return d;
  } else {
    return parent;
  }
};

function findNodeFor(d, root) {
}
