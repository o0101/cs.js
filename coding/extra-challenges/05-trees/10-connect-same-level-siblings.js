// this is sort of like a skip list
// it's cool because I never thought about creating a skiplist
// by joining the nodes in a level of a tree
let populateSiblingPointers = function(root) {
  const levels = [];
  const queue = [{node: root, d:0}];
  let lastLevel = -1;
  let levelTail;
  while(queue.length) {
    const {node, d} = queue.shift();
    // push the next guys on
    queue.push(
      ...[node.left, node.right]
      .filter(n => n)
      .map(node => ({node, d:d+1}))
    );
    // set levelTail correctly
    if ( lastLevel != d ) {     // we arrived at the next level
      levelTail = node; 
      lastLevel = d;
    }
    // save the level head (my little addition) O(log n)/O(n) memory part
    if ( !levels[d] ) {
      levels[d] = node;
      levelTail = node;
    }
    // update the level tail
    levelTail.next = node;
    levelTail = levelTail.next;
  }
  // TODO: Write - Your - Code
  console.log(levels.map(n => n.data));
  return root;
}
