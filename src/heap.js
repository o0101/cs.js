import {Tree, Node, Empty} from './lib/tree.js';

/* DEV LOG
  I implemented this on Feb 24 2021
  from the Wikipedia article on heaps
  https://en.wikipedia.org/wiki/Heap_(data_structure)
*/

// constants
  const DEFAULT_OPTIONS = {
    invert: false,          /* invert order of compare */
    asTree: false,          /* underlying implementation as tree, false is list implementation */
    max: true,              /* max heap, false is min heap */
    arity: 2,               /* binary, then 3 is ternary, etc. */
    compare: undefined      /* a custom comparator per JS Array.sort compareFunction interface */
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters 
      // with comparison directed by the heap property
      // so compare(bigger, smaller) is > 0 for max heap
      // while compare(smaller, bigger) is > 0 for min heap
      // and vice versa
      // in essence, it's 
      // compare(top, bottom) > 0 and compare(bottom, top) < 0
      // DEFAULT comparison is simply this applied to Numbers
      // But you need to handle Symbol as well
  };

  // helper constants

export default class Heap {
  // private fields
  #size
  #store
  #firstEmptySpace

  // API
    constructor(options, data) {
      if ( ! options ) {
        options = DEFAULT_OPTIONS;
      }
      options = Object.assign({}, DEFAULT_OPTIONS, options);

      guardValidOptions(options);

      const sign1 = options.invert ? -1 : 1;
      const sign2 = options.max? -1 : 1;
      options.sign = sign1*sign2;
      this.config = Object.freeze(options);

      if ( options.max ) {
        this.findMax = () => this.peek();
        this.extractMax = () => this.pop();
        this.deleteMax = () => void this.pop();
      } else {
        this.findMin = () => this.peek();
        this.extractMin = () => this.pop();
        this.deleteMin = () => void this.pop();
      }

      if ( options.asTree ) {
        this.#store = new Tree({arity: options.arity});
        this.#firstEmptySpace = this.#store.firstEmptyLeaf();
      } else {
        this.#store = new Array();
        this.#firstEmptySpace = 0;
        this.#store[this.#firstEmptySpace] = Empty;
      }

      this.#size = 0;

      if ( data !== undefined ) {
        try {
          Heap.heapify(this, data);
        } catch(e) {
          console.warn({e, data});
          if ( e.toString().includes('iterable') ) {
            throw new TypeError(`Parameter 'data' needs to be iterable, if provided. It was not.`);
          } else {
            throw e;
          }
        }
      }
    }

    get size() {
      return this.#size;
    }

    peek() {
      // show top of heap
      if ( this.config.asTree ) {
        return this.#store.getRoot().thing;
      } else {
        return this.#store[0];
      }
    }

    pop() {
      // remove top of heap and show it
      let root, top;
      if ( this.config.asTree ) {
        root = this.#store.getRoot();
        top = root.thing;
      } else {
        root = 0;
        top = this.#store[root];
      }

      this.#deleteThing(root);

      this.#size -= 1;

      if ( top !== Empty ) {
        return top;
      }
    }

    push(thing) {
      // push thing onto top of heap

      let aRoot = this.#firstEmptySpace;

      // insert the item and update the firstEmptySpace for next time
      if ( this.config.asTree ) {
        aRoot.thing = thing;
        this.#firstEmptySpace = this.#store.firstEmptyLeaf();
      } else {
        this.#store[aRoot] = thing;
        this.#firstEmptySpace = this.#store.length;
        this.#store[this.#firstEmptySpace] = Empty;
      }

      this.#siftUp(aRoot);

      this.#size += 1;
    }

    replace(thing) {
      // remove top of heap and push thing there
      const top = this.peek();
      
      let aRoot;

      if ( this.config.asTree ) {
        aRoot = this.#store.getRoot();
      } else {
        aRoot = 0;
      }

      this.#updateThing(aRoot, thing);

      return top;
    }

  // private instance methods
    // 
    #updateThing(aRoot, newThing) {
      // change the value of thing
      let currentThing;

      // get current and update aRoot's thing
        if ( this.config.asTree ) {
          currentThing = aRoot.thing;
          aRoot.thing = newThing;
        } else {
          currentThing = this.#store[aRoot];
          this.#store[aRoot] = newThing;
        }

      const comparison = this.#compare(newThing, currentThing);

      if ( comparison > 0 ) {
        this.#siftUp(aRoot);
      } else if ( comparison < 0 ) {
        this.#siftDown(aRoot);
      }
    }

    #deleteThing(aRoot) {
      // delete the element
      // sift down
      if ( this.config.asTree ) {
        aRoot.thing = Empty;
      } else {
        this.#store[aRoot] = Empty;
      }
      this.#siftDown(aRoot);


      // delete the existing extra space
      const extraSpace = this.#firstEmptySpace;
      if ( this.config.asTree ) {
        const {parent} = extraSpace;
        if( parent ) {
          parent.deleteSubtree(extraSpace);
        }
      } else {
        if ( extraSpace === this.#store.length - 1 ) {
          this.#store.length = extraSpace;
        }
      }
      // update first empty space to be the new slot
      this.#firstEmptySpace = aRoot;
    }

    #siftUp(aRoot) {
      let parent = this.#getParent(aRoot);

      // as long as parent exists and is lower in the heap than aRoot
      while(
            parent !== undefined && 
            this.#compare(this.#getThing(parent), this.#getThing(aRoot)) < 0 
        ) {
          // swap them and push aRoot up, 
          // and get the new aRoot slot for the next comparison
          ([aRoot] = this.#swap(aRoot, parent));  

          // what just happened?
          // aRoot has now become the slot that parent was

          // get the next parent for the next comparison
          parent = this.#getParent(aRoot);
      }
    }

    #siftDown(aRoot) {
      let children = this.#getChildren(aRoot);
      let topChild = this.#getTopFromList(children);

      // as long as topChild exists and aRoot is lower in the heap than topChild
      
      while(
          topChild !== undefined &&
          this.#compare(this.#getThing(aRoot), this.#getThing(topChild)) < 0
        ) {
          // push it down, and get the new aRoot for comparison
          ([aRoot] = this.#swap(aRoot, topChild));  
          // what just happened?
          // aRoot has now become the slot that topChild was

          // get the next topChild for comparison
          children = this.#getChildren(aRoot);
          topChild = this.#getTopFromList(children);
      }
    }

    #getThing(slot) {
      if ( this.config.asTree ) {
        return slot.thing;
      } else {
        if ( slot < this.#store.length ) {
          // Note on getThing logic for list implementations:
            // if we have a custom comparator,
            // it needs to handle undefined things (and provide an ordering logic for those)
            // so we pass them through, even if they are undefined
            // if we do not have a custom comparator
            // we pass the value if it is not undefined
            // otherwise if it is undefined we pass Empty
          const value = this.#store[slot];
          if ( this.config.compare ) {
            return value; 
          } else if ( value !== undefined ) {
            return value;
          } else {
            return Empty;
          }
        } else {
          return Empty;
        }
      }
    }

    #swap(a, b) {
      // what do we swap?
        // we only "swap" the *value* (thing) of two slots, 
        // NOT the *structure* of two slots (thing + the children)
      if ( this.config.asTree ) {
        const temp = a.thing;
        a.thing = b.thing;
        b.thing = temp;
      } else {
        const temp = this.#store[a];
        this.#store[a] = this.#store[b];
        this.#store[b] = temp;
      }

      // why do we return the slots in reversed order?
        // because this represents the new positions of the 
        // slots values
      return [b, a];
    }

    #compare(aThing, bThing) {
      // Empty is always lower in heap 
      // regardless of min or max
      if ( bThing === Empty ) {
        return 1;
      } else if ( aThing === Empty ) {
        return -1;
      }

      const sign = this.config.sign;

      if ( this.config.compare ) {
        return sign*this.config.compare.call(this, aThing, bThing);
      } else {
        // heap-property comparison
        if ( aThing > bThing ) {
          return -sign;
        } else if ( aThing === bThing ) {
          return 0;
        } else {
          return sign;
        }
      }
    }

    #getParent(aRoot) {
      if ( this.config.asTree ) {
        return aRoot.parent;
      } else {
        if ( aRoot > 0 ) {
          return Math.floor((aRoot-1)/this.config.arity);
        }
      }
    }

    #getChildren(aRoot) {
      if ( this.config.asTree ) {
        // children are nodes
        return [...aRoot.children];
      } else {
        // children are indices
        const {arity} = this.config;
        const start = arity*aRoot+1;
        const list = [];
        for( let i = start; i < Math.min(this.#store.length,start+arity); i++ ){
          list.push(i);
        }
        return list;
      }
    }

    #getTopFromList(list) {
      let top;
      let topThing = Empty;

      if ( this.config.asTree ) {
        // top is a node, 
        // list is nodes
        for ( const el of list ) {
          const {thing} = el;
          if ( this.#compare(thing, topThing) >= 0 ) {
            top = el;
            topThing = thing;
          }
        }
        return top;
      } else {
        // top is an index
        // list of indices
        list.forEach(index => {
          //const thing = this.#store[index];
          const thing = this.#getThing(index);
          if ( this.#compare(thing, topThing) >= 0 ) {
            top = index;
            topThing = thing;
          }
        });
      }

      return top;
    }

    *#unordered() {
      if ( this.config.asTree ) {
        for( const {node} of this.#store.dfs() ) {
          yield node.thing;
        }
      } else {
        for( const item of this.#store ) {
          yield item;
        }
      }
    }

  // static methods
    static print(heap, transform) {
      let row = 0;
      console.log(`\nHeap (${heap.config.asTree ? 'as tree' : 'as list'})`);
      console.log(`#store: ${heap.#store.constructor.name}`);
      console.log(`\nRow: ${row}`);
      const Row = [];

      if ( heap.config.asTree ) {
        for( const stuff of heap.#store.bfs() ) {
          const {node,depth} = stuff;
          if ( depth > row ) {
            row = depth;
            console.log(`\n\nRow: ${row}`);
            console.log(Row.join(''));
            Row.length = 0;
          }
          if ( typeof node.thing !== 'symbol' ) {
            if ( typeof node.thing === "object" ) {
              Row.push(`node: ${JSON.stringify(node.thing)} \t`);
            } else {
              Row.push(`node: ${node.thing} \t`);
            }
          } else {
            Row.push(`node: ${Symbol.keyFor(node.thing)} \t`);
          }
        }
      } else {
        for( let i = 0; i < heap.#store.length; i++ ) {
          const depth = Math.floor(Math.log(i+1)/Math.log(heap.config.arity));
          const thing = heap.#store[i];
          if ( depth > row ) {
            row = depth;
            console.log(`\n\nRow: ${row}`);
            console.log(Row.join(''));
            Row.length = 0;
          }
          if ( typeof thing !== 'symbol' ) {
            let out = thing;
            if ( transform !== undefined ) {
              out = transform(out); 
            }
            if ( typeof out === "object" ) {
              Row.push(`node: ${JSON.stringify(out)} \t`);
            } else {
              Row.push(`node: ${out} \t`);
            }
          } else {
            Row.push(`node: ${Symbol.keyFor(thing)} \t`);
          }
        }
      }
      console.log('\n\n');
    }

    static merge(heap1, heap2) {
      const bigList = [...heap1.#unordered(), ...heap2.#unordered()];
      return new Heap(heap1.config, bigList);
    }

    static heapify(heap, data) {
      if ( heap.size > 0 ) {
        throw new TypeError(`Cannot call heapify using a non-empty heap.`);
      }
      // the idea is
      // we build a tree first
      // that can hold data (asTree or as list)
      // then we fill from end of data to start
      // from right bottom of tree moving to top and left
      // and at each stage we call siftDown on every node
      // this runs in O(n) 
      const nodes = [];

      for( let i = data.length - 1; i >= 0; i-- ) {
        const parentIndex = Math.floor((i-1)/heap.config.arity);
        if ( heap.config.asTree ) {
          let childNode = nodes[i];
          if ( ! childNode ) {
            nodes[i] = childNode = new Node({thing: data[i]});
            heap.#size += 1;
          }

          if ( i > 0 ) {
            let parent = nodes[parentIndex];
            if ( ! parent ) {
              nodes[parentIndex] = parent = new Node({thing: data[parentIndex]});
              if ( parentIndex === 0 ) {
                heap.#store.setRoot(parent);
              }
              heap.#size += 1;
            }

            parent.addChild(childNode);
          }
        } else {
          if ( ! nodes[i] ) {
            heap.#store[i] = data[i];   
            nodes[i] = true;
            heap.#size += 1;
          }

          if ( parentIndex >= 0 ) {
            if ( ! nodes[parentIndex] ) {
              heap.#store[parentIndex] = data[parentIndex];
              nodes[parentIndex] = true;
              heap.#size += 1;
            }
          }
        }
      }

      // now we have an unbalanced tree build and in store, 
      // regardless of whether we use tree or list store

      // now we need to call sift down
      for( let i = nodes.length - 1; i >= 0; i-- ) {
        const aRoot = heap.config.asTree ? nodes[i] : i;
        heap.#siftDown(aRoot);
      }
    }
}

export const Class = Heap;
export function create(...args) {
  return new Heap(...args);
}

// helper classes
// helper methods
  function guardValidOptions(opts) {
    const OptionTypes = {
      invert: 'boolean',
      asTree: 'boolean',         
      max: 'boolean',              
      arity: 'number',              
      compare: ['undefined', 'function'],
      sign: 'number'
    };
    const OptionKeys = new Set(Object.keys(OptionTypes));


    const errors = [];
    const typesValid = Object
      .entries(opts)
      .every(([key, value]) => {
        const type = OptionTypes[key]
        let valid;
        if ( Array.isArray(type) ) {
          valid = type.includes(typeof value);
        } else {
          valid = typeof value === type;
        }
        if ( ! valid ) {
          errors.push({
            key, value, 
            message: `
              Option ${key} must be a ${type} if given. 
              It was ${value}.
            `
          });
        }
        return valid;
      });

    const keysValid = Object
      .keys(opts)
      .every(key => {
        const valid = OptionKeys.has(key);
        if ( ! valid ) {
          errors.push({
            key,
            message: `
              Options contained an unrecognized key: ${key}
            `
          });
        }
        return valid;
      });

    const isValid = typesValid && keysValid;

    if ( ! isValid ) {
      console.warn(JSON.stringify({errors,keysValid, typesValid}, null, 2));
      throw new TypeError(`Options were invalid.`);
    }
  }

