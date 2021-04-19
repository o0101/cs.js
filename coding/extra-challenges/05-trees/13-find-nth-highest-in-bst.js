let findNthHighestInBST = function(node, n = 1) {
  let i = 0;
  return recInOrder(node, n);

  function recInOrder(node, n) {
    if ( ! node ) return;

    let found = recInOrder(node.right, n);
    if ( found ) return found;

    i += 1;

    if ( i === n ) {
      return node;
    }

    return recInOrder(node.left, n);
  }
};

