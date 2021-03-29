// attributes are not required
class Node_xml {
  constructor(name) {
    this.node_name = name;
    this.children = [];
  }
}

let createXmlTree = function parse(xml) {
  const stack = [];
  let root;

  for( const token of tokens(xml) ) {
    const {tagName, attrs, isEndTag, isText, textContent} = token;
    const top = stack[stack.length-1];
    if ( isEndTag ) {
      if ( stack[stack.length-1].node_name === tagName ) {
        root = stack.pop();  
        if ( ! root ) {
          throw new TypeError(`Too many closing tags. No tags on the stack`);
        }
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

  if ( stack.length ) {
    throw new TypeError(`Not enough closing tags. Some tags remain open.`);
  }

  return root;
};

function tokens(s) {
  s = Array.from(s);

  const T = [];
  let tagName = '';
  let textContent = '';
  let isTag = false;
  let isText = true;

  let i = 0;
  while(i < s.length) {
    const c = s[i];

    if ( c === '<' ) {
      if ( textContent.length ) {
        T.push({isText,textContent});
      }
      textContent = '';
      isText = false;
      isTag = true;
      i++;
      continue;
    } else if ( c === '/' ) {
      if ( isTag ) {
        if ( s[i+1] === '>' ) {
          s += 2;
          T.push({isTag,tagName});
          isTag = false;
          tagName = '';
          isText = true;
          continue;
        } else {
          throw new TypeError(`Invalid closing tag syntax. / must be followed immediately by >`);
        }
      } else if ( isText ) {
        textContent += c;
        s++;
        continue;
      } else {
        throw new TypeError(`Invalid state. Tokenizer is always either in a tag or in text, but it was
          in neither.`);
      }
    } else {
      if ( isTag ) { 
        tagName += c;
        i++;
      } else if ( isText ) {
        textContent += c;
        i++;
      } else {
        throw new TypeError(`Invalid state. Tokenizer is always either in a tag or in text, but it was
          in neither.`);
      }
    }
  }

  if ( isTag ) {
    T.push({isTag,tagName});
  } else if ( isText ) {
    if ( textCotent.length ) {
      T.push({isText,textContent});
    }
  }

  console.log({s:s.join(''), tokens:T});

  return T;
}
