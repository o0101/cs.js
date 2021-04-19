let serialize = function(node, stream) {
  if ( ! node ) return;

  const stack = [node];
  while(stack.length) {
    const node = stack.pop();
    const el = {data:node.data};
    if ( ! node.left && node.right ) {
      el.noLeft = true;
    }
    stream.push(JSON.stringify(el));
    if ( node.left || node.right ) {
      stack.push(...[node.right, node.left].filter(n => n));
    } else if ( stack.length ) {
      stream.push('{}');
    }
  }
  //console.log(stream);
};

let deserialize = function(stream) {
  const stack = [];
  let parent;
  let root;
  while(stream.length) {
    const el = JSON.parse(stream.shift());
    //console.log(el);
    if ( el.data !== undefined ) {
      const node = new BinaryTreeNode(el.data);
      if ( ! root ) {
        root = node;
      } else {
        parent.node[parent.disp] = node;
      }
      parent = {node, disp: el.noLeft ? 'right' : 'left'};
      stack.push(parent);
    } else {
      stack.pop();
      parent = stack.pop();
      while ( parent && parent.disp === 'right' ) {
        parent = stack.pop();
      }
      if ( parent && parent.disp === 'left' ) {
        parent.disp = 'right';
        stack.push(parent);
      } else break;
    }
  }

  return root;
}
