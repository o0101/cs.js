let displayTreePerimeter = function(root) {
  const leftSide = getChain(root, 'left');
  const rightSide = getChain(root, 'right');
  const bottom = dfs(root);
  // don't double include the left-bottom and right-bottom corner nodes
  // they are already in the leftSide and rightSide respectively
  bottom.shift();
  bottom.pop();
  // also don't double count the root node, so
  rightSide.shift();
  // and we go anti-clockwise so
  rightSide.reverse();
  const perim = [...leftSide, ...bottom, ...rightSide];
  return perim.map(({data}) => data).join(' ');
};

function getChain(node, branch) {
  const chain = [];
  while(node) {
    chain.push(node);
    node = node[branch];
  }
  return chain;
}

function dfs(node, leavesOnly = true) {
  const stack = [node];
  const nodes = [];
  while(stack.length) {
    const node = stack.pop();
    if ( !leavesOnly ) {
      nodes.push(node);
    }
    if ( node.left || node.right ) {
      stack.push(...[node.left,node.right].filter(n => n));
    } else if ( leavesOnly ) {
      nodes.push(node);
    }
  }
  return nodes;
}~

