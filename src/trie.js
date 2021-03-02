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

    set(string, value) {
      let {node, suffix} = this.#locate(string);
      
      if ( suffix.length > 0 ) {
        for( const char of suffix ) {
          if ( !( char in node.children) ) {
            node.children[char] = new TrieNode({char});
          } 
          node = node.children[char];
        }
        this.#size += 1;
      }

      node.value = value;
    }

    get(string) {
      const {suffix, node} = this.#locate(string);
      let found = true;
      let value;

      if ( suffix.length === 0 ) {
        ({value} = node);
      } else {
        found = false;
      }

      return {found, value}
    }

    delete(string) {
      return this.#delete(string, this.#store, 0); 
    }

  // private instance methods
    #locate(string) {
      let node = this.#store;
      let suffixStart = 0;

      for( const char in string ) {
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
        if ( char in node.children && this.#delete(string, node.children[char], i+1) ) {
          delete node.children[char];
        }
      }
      return node.value === Empty && Object.keys(node.children).length === 0;
    }

  // static methods
    static print(trie) {
      let row = 0;
      console.log(`\nRow: ${row}\n`);

      for( const stuff of trie.#store.bfs() ) {
        const {node,depth} = stuff;
        if ( depth > row ) {
          row = depth;
          console.log(`\nRow: ${row}\n`);
        }
        if ( typeof node.thing !== 'symbol' ) {
          if ( typeof node.thing === "object" ) {
            process.stdout.write(`node: ${JSON.stringify(node.thing)} \t`);
          } else {
            process.stdout.write(`node: ${node.thing} \t`);
          }
        } else {
          process.stdout.write(`node: ${Symbol.keyFor(node.thing)} \t`);
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
}

export const Class = Trie;
export function create(...args) {
  return new Trie(...args);
}

// helper classes
  export class TrieNode {
    constructor(opts = {}) {
      if ( opts.char === undefined ) {
        throw new TypeError(`TrieNode must be created with a string passsed to the 'char' option`);
      } 
      this.char = opts.char;

      if ( Object.hasOwnProperty.call(opts, 'value') ) {
        this.value = opts.value;
      } else {
        this.value = Empty;
      }

      this.children = opts.children || Object.create(null);
    }
  }

