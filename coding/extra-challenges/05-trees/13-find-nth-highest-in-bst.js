let findNthHighestInBST = function(node, n) {
  return recInOrder(node, n, 0);
};

function recInOrder(node, n = 1, i = 0) {
  ({i,node} = recInOrder(node.right, n, i + 1));

  if ( i === n ) {
    return node;
  } 

  ({i, node} = recInOrder(node.left, n, i + 1))

  if ( i === n ) {
    return node;
  } 
}
