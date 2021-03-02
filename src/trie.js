import {Empty} from './lib/tree.js';

/* DEV LOG
  I implemented this on March 2 2021
  from the Wikipedia article on tries
  https://en.wikipedia.org/wiki/Trie_(data_structure)
*/

// constants
  export const Start = Symbol.for(`@Start`);

export default class Trie {
  // private fields
    // size, and the root node
    #size
    #store

  // API
    constructor(data) {
      this.#store = new TrieNode({char:'', value:Start});
      this.#size = 0;
      if ( data !== undefined ) {
        Trie.trieify(this, data);
      }
    }

    get size() {
      return this.#size;
    }

    has(string) {
      return this.get(string).found;
    }

    set(string, value) {
      let {node, suffix} = this.#locate(string);
      
      if ( suffix.length > 0 ) {
        for( const char of suffix ) {
          if ( !( char in node.children) ) {
            node.children[char] = new TrieNode({char});
          } 
          node = node.children[char];
        }
      }

      this.#size += 1;
      node.value = value;
    }

    get(string) {
      const {suffix, node} = this.#locate(string);

      let found = false;
      let value;

      if ( suffix.length === 0 && node.value !== Empty ) {
        ({value} = node);
        found = true;
      }

      return {found, value}
    }

    delete(string) {
      if ( this.has(string) ) {
        const wholeSubtreeDeleted = this.#delete(string, this.#store, 0); 
        this.#size -= 1;
        return wholeSubtreeDeleted;
      }
    }

  // API alias
    insert(key, value) {
      return this.set(key, value);
    }

  // private instance methods
    // locate a string in the trie
    #locate(string) {
      let node = this.#store;
      let suffixStart = 0;

      for( const char of string ) {
        if ( char in node.children ) {
          node = node.children[char];
          suffixStart += 1;
        } else break;
      }

      const suffix = string.slice(suffixStart);
      return {suffix, node};
    }

    #delete(string, node, i) {
      if ( i === string.length ) {
        node.value = Empty; 
      } else {
        const char = string[i];
        if ( char in node.children ) {
          const subtreeEmpty = this.#delete(string, node.children[char], i+1);
          if ( subtreeEmpty ) {
            delete node.children[char];
          }
        }
      }
      return node.value === Empty && Object.keys(node.children).length === 0;
    }

    *#bfs() {
      const root = this.#store;
      const queue = [{node:root, depth:0}]; 

      while(queue.length) {
        const {node,depth} = queue.shift();
        queue.push(...Object.values(node.children).map(child => ({node:child,depth:depth + 1})));
        yield {node,depth};
      }
    }

  // static methods
    static print(trie) {
      let row = 0;
      console.log(`\nTrie. Size: ${trie.size}`);

      console.log(`\n\tRow: ${row}`);

      for( const stuff of trie.#bfs() ) {
        const {node,depth} = stuff;
        if ( depth > row ) {
          row = depth;
          console.log(`\n\tRow: ${row}`);
        }
        if ( typeof node.value !== 'symbol' ) {
          if ( typeof node.value === "object" ) {
            process.stdout.write(`node: ${node.char} -> ${JSON.stringify(node.value)} \t`);
          } else {
            process.stdout.write(`node: ${node.char} -> ${node.value} \t`);
          }
        } else {
          process.stdout.write(`node: ${node.char} -> ${Symbol.keyFor(node.value)} \t`);
        }
      }

      console.log('\n\n');
    }

    static merge(trie1, trie2) {
      console.log({trie1,trie2});
    }

    static trieify(trie, data) {
      console.log({trie,data});
    }

    // static test methods
      static _testLocate(trie, key) {
        return trie.#locate(key);
      }
}

export const Class = Trie;
export function create(...args) {
  return new Trie(...args);
}

// helper classes
  export class TrieNode {
    constructor(opts = {}) {
      if ( Object.hasOwnProperty.call(opts, 'value') ) {
        this.value = opts.value;
      } else {
        this.value = Empty;
      }

      this.children = opts.children || Object.create(null);
    }
  }

