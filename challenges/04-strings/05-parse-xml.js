// attributes are not required
class Node_xml {
  constructor(name) {
    this.node_name = name;
    this.children = [];
  }
}

let createXmlTree = function parse(xml) {
  const root = new Node_xml();
  const stack = [];

  for( const token of tokens(xml) ) {
    const {tagName, attrs, isEndTag, isText, textContent} = token;
    const top = stack[stack.length-1];
    if ( isEndTag ) {
      if ( stack[stack.length-1].node_name === tagName ) {
        stack.pop();  
      } else {
        throw new TypeError(`Invalid XML. No closing tag for ${stack[stack.length-1].node_name}.
          Instead got closing tag for ${tagName}
        `);
      }
    } else if ( isText ) {
      const node = new Node_xml(textContent);
      top.children.push(node);
    } else {
      const node = new Node_xml(tagName);
      top.children.push(node);
      stack.push(node);
    }
  }

  if ( stack.length === 1 ) {
    return stack[0];
  } else if ( stack.length !== 
  return root;
};
