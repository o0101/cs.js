/**
  Copying from previous of my solutions where I already had assume
  parent pointers (or created them myself)

**/
let inorderSuccessorBST = function(root, d) {
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
  d = node;
  if ( ! d ) return;
  if ( d.right ) {
    d = d.right;
    while(d.left) {
      d = d.left;
    }
    return d;
  } else if ( d.parent ) {
    while(d.parent && (d.parent.data < d.data)) {
      d = d.parent;
    }
    return d.parent;
  }
};


