let levelOrderTraversal = function(root) {
  if ( ! root ) return;
  const queue = [{node:root, level:0}];
  let lastLevel = -1;
  const rows = [];
  let row = '';
  while(queue.length ) {
    const {node,level} = queue.shift();
    if ( level > lastLevel ) {
      if ( row.length ) {
        rows.push(
          row.map(
            ({data}) => data
          ).join(' ')
        );
      }
      row = [node];
    } else {
      row.push(node);
    }
    console.log(node);
    if ( node.left ) {
      queue.push({node:node.left, level:level+1});
    }
    if ( node.right ) {
      queue.push({node:node.right, level:level+1});
    }
    lastLevel = level;
  }
  if ( row.length ) {
    rows.push(
      row.map(
        ({data}) => data
      ).join(' ')
    );
  }
  console.log(rows.join('\n'));
  return rows.join(' ');
};
