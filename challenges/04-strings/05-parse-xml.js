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

  console.log(xml);
  console.log(tokens(xml));

  for( const token of tokens(xml) ) {
    const {tagName, attrs, isEndTag, isText, isSelfClosing, textContent} = token;
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
      if ( top ) {
        top.children.push(node);
      } else {
        root = node;
      }
      stack.push(node);
    }
  }

  if ( stack.length ) {
    throw new TypeError(`Not enough closing tags. Some tags remain open.`);
  }

  return root;
};

console.log(createXmlTree(`<xml><data></data><a><b></b><b><c></c></b></a></xml>`));
console.log(createXmlTree(`<xml><data></data><a>OKay some data<b></b><b><c>text</c>hello world</b></a></xml>`));

function tokens(s) {
  s = Array.from(s);

  const T = [];
  let tagName = '';
  let textContent = '';
  let isTag = false;
  let isEndTag = false;
  let isText = true;

  let i = 0;
  while(i < s.length) {
    const c = s[i];

    //console.log({isTag,isText,tagName,textContent,c,i});

    if ( c === '<' ) {
      if ( textContent.length ) {
        T.push({isText,textContent});
      }
      textContent = '';
      isText = false;
      isTag = true;
      i++;
      if ( s[i] === '/' ) {
        isEndTag = true;
        i++;
      }
      continue;
    } else if ( c === '/' ) {
      if ( isTag && ! isEndTag ) {
        if ( s[i+1] === '>' ) {
          s += 2;
          T.push({isTag,tagName, isSelfClosing:true});
          isTag = false;
          tagName = '';
          isText = true;
          continue;
        } else {
          throw new TypeError(`Invalid self closing tag syntax. / must be followed immediately by >`);
        }
      } else if ( isText ) {
        textContent += c;
        i++;
        continue;
      } else {
        throw new TypeError(`Invalid state. Tokenizer is always either in a tag or in text, but it was
          in neither.`);
      }
    } else if ( c === '>' ) {
      if ( isTag ) {
        T.push({isTag,tagName,isEndTag});
        isEndTag = false;
        isTag = false;
        tagName = '';
        isText = true;
        i++;
        continue;
      } else if ( isText ) {
        textContent += c;
        i++;
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
    throw new TypeError(`Tag ${tagName} in last position does not have terminating characters.`);
  } else if ( isText ) {
    if ( textContent.length ) {
      T.push({isText,textContent});
    }
  }

  return T;
}
