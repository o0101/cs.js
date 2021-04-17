let isBst = function(root) {
  const inOrder = getInOrderList(root);
  let valid = true;
  let last = -Infinity;
  for( const data of inOrder ) {
    valid = valid && last <= data;
    last = data;
  }

  return valid;
}

function getInOrderList(root, list = []) {
  if ( ! root ) {
    return list;
  }

  // slightly less memory as we don't create a new list at every node
  list.unshift(...getInOrderList(root.left));
  list.push(root.data, ...getInOrderList(root.right));
  return list;

  /// more memory and more gc as we create a new list at every node
  //return [...getInOrderList(root.left), root.data, ...getInOrderList(root.right)];
}
