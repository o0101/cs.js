let prev;
let convertToLinkedList = function(root) {
  prev = null;
  const head = {node:null};
  linkRec(root, head);
  return head.node;
};

function linkRec(root, head) {
  if ( ! root ) return; 

  linkRec(root.left, head);
  if ( prev !== null ) {
    prev.right = root;
  } else {
    head.node = root;
  }
  root.left = prev;
  prev = root;
  linkRec(root.right, head);
}
