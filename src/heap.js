/* DEV LOG
  I implemented this on Feb 24 2021
  from the Wikipedia article on heaps
  https://en.wikipedia.org/wiki/Heap_(data_structure)
*/

// constants
  const DEFAULT_OPTIONS = {
    asTree: true,           /* underlying implementation as tree */
    asList: false,
    max: true,              /* max heap */
    min: false,
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
  };

  // helper constants
    const DEFAULT_TREE_OPTIONS = {
      arity: 2,               /* binary, then 3 is ternary, etc. */
    }

// used to uniquely determine if a slot is empty
  // Why? Because in some comparison schemes undefined or null could represent
  // a value, so it's better to have an unambiguous symbol for emptiness
  // than to assume undefined or null will NEVER be given semantic meaning by people
const Empty = () => Symbol.for('[[EmptyHeapSlot]]`);
export Empty;

export default class Heap {
  // private fields
  #size
  #store
  #firstEmptySpace

  // API
    constructor(options, ...data) {
      if ( ! options ) {
        options = DEFAULT_OPTIONS;
      }

      guardValidOptions(options);

      this.config = Object.freeze(clone(options));

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
        this.#firstEmptySpace = this.#store.newDeepestLeaf();
      } else {
        this.#store = new Array();
        this.#firstEmptySpace = 0;
      }

      console.warn(`Need to implement Floyd algorithm for heapifying data`);

      this.#size = 0;
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

      return top;
    }

    push(thing) {
      // push thing onto top of heap

      let aRoot = this.#firstEmptySpace;

      if ( this.config.asTree ) {
        aRoot.thing = thing;
        this.#firstEmptySpace = this.#store.newDeepestLeaf();
      } else {
        this.#store[aRoot] = thing;
        this.#firstEmptySpace += 1;
      }

      this.#siftUp(aRoot);

      this.#size += 1;
    }

    replace(thing) {
      // remove top of heap and push thing there

    }

  // private instance methods
    // 
    #updateThing(currentThing, newThing) {
      // change the value of thing

    }

    #deleteThing(aRoot) {
      // delete the element
      // sift down
      if ( this.config.asTree ) {
        aRoot.thing = Empty();
      } else {
        this.#store[aRoot] = Empty();
      }
      this.#siftDown(aRoot);
    }

    #siftUp(thing) {

    }

    #siftDown(aRoot) {
      let children = this.#getChildren(aRoot);
      let topChild = this.#getTopFromList(children);

      // as long as aRoot is lower in the heap than topChild
      while(this.#compare(aRoot, topChild) < 0 ) {
        // push it down, and get the new aRoot for comparison
        ([aRoot] = this.#swap(aRoot, topChild));  
        // what just happened?
        // aRoot has now become the slot that topChild was

        // get the next topChild for comparison
        children = this.#getChildren(aRoot);
        topChild = this.#getTopFromList(children);
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

    #compare(a, b) {
      if ( this.config.compare ) {
        return this.config.compare(a, b);
      } else {
        // Empty is always lower in heap 
        // regardless of min or max
        if ( b == Empty ) {
          return 1;
        } else if ( a == Empty ) {
          return -1;
        }

        // heap-property comparison
        if ( a > b ) {
          return this.config.max ? 1 : -1;
        } else if ( a == b ) {
          return 0;
        } else {
          return this.config.min ? 1 : -1;
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
        for( let i = start; i < start+arity; i++ ){
          list.push(i);
        }
        return list;
      }
    }

    #getTopFromList(list) {
      let top;
      let topThing = Empty();

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
          const thing = this.#store[index];
          if ( this.#compare(thing, topThing) >= 0 ) {
            top = index;
            topThing = thing;
          }
        });
      }

      return top;
    }

  // static methods
    static merge(heap1, heap2) {

    }
}


// helper classes
  class Tree {
    constructor(options) {
      if ( ! options ) {
        options = DEFAULT_TREE_OPTIONS;
      }

      this.config = Object.freeze(clone(options));
    }
  }

  class Node {
    constructor({parent, thing, children} = {}) {
      Object.assign(this, {parent, thing});
      if ( children !== undefined ) {
        this.children = children;
      }
    }

    get children() {
      return this.#children || [];
    }

    set children(newChildren) {
      if ( Array.isArray(newChildren) ) {
        this.#children = newChildren;
      } else throw new TypeError(`Children can only be an array. Received: ${newChildren}`);
    }
  }

// helper methods
  function guardValidOptions(opts) {
    throw new TypeError(`Implement Guard Valid Options`);
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
 
