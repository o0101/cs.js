import {clone} from './common.js';

const DEFAULT_TREE_OPTIONS = {
  arity: 2,               /* binary, then 3 is ternary, etc. */
}
const THING = 'thing';

// used to uniquely determine if a slot is empty
  // Why? Because in some comparison schemes undefined or null could represent
  // a value, so it's better to have an unambiguous symbol for emptiness
  // than to assume undefined or null will NEVER be given semantic meaning by people
export const Empty = Symbol.for('@Empty');

export class Tree {
  // private fields
    // 
    #root
    #DFS_ITERATOR_OBJ
    #BFS_ITERATOR_OBJ

  constructor(options) {
    if ( ! options ) {
      options = DEFAULT_TREE_OPTIONS;
    }
    options = Object.assign(clone(DEFAULT_TREE_OPTIONS), options);

    this.config = Object.freeze(clone(options));

    const that = this;

    this.#DFS_ITERATOR_OBJ = {
      get [Symbol.iterator]() {
        return that.#dfsIterator.bind(that);
      }
    };
    this.#BFS_ITERATOR_OBJ = {
      get [Symbol.iterator]() {
        return that.#bfsIterator.bind(that);
      }
    };
  }

  getRoot() {
    return this.#root;
  }

  setRoot(newRoot) {
    this.#root = newRoot;
  }

  bfs() {
    return this.#BFS_ITERATOR_OBJ;
  }

  dfs() {
    return this.#DFS_ITERATOR_OBJ;
  }

  firstEmptyLeaf() {
    /*
      For heap, we need this. newDeepestLeaf is not sufficient
      because it will keep adding leaves below the deepest one.
      So we need to for heap actually fill out the deepest row from 
      left to right.

      There's a couple cases.

      First we need to find the deepest row. We need to determine if 
      that row is empty. If it has some empty slots, we need to return 
      the existing empty node or we need to create a new node.

      If the deepest row is also full we need to create a new row
      (a new deepest leaf, like newDeepestLeaf).

      There's probably a fast way to do this in future but
      for now we just find it.
    */

    /* 
      One way to do this, we could find deepest left (first) 
      leaf, and then once we find it (it is just the first leaf we find
      because we fill from left it by definition must be deepest

      Uh oh, but what about if we deleted that leftmost deepest leaf
      Then the "first" leaf we find will not be deepest

      Unless the corresponding siftDown will rebalance left to right
      But I don't think it does.

      So in order to find the deepestRowEmptyLeaf we need to first find the 
      genuine deepest row (full DFS/BFS), and then scan from left to right across it.

      But what about the shape property?

      When we delete a node, how do we get the shape property to stay consistent?

      What if we do like this...

      BFS, and also know the depth so we know when we on the last row

      Maybe just have a function "lastRow"

      Then we scan across from left to right.

      We find the first empty slot

      How to for tree? Actually for tree better to find the second to last row
      and find the first node with empty child slot

      If the second to last row has everything totally full, then the first slot must be a new node
      in a new row.

      For an array it's much simpler, we just scan the array for the first Empty slot, which 
      by the postcondition of sifting must be in a low row. 

      But I'm thinking, what happens if you delete most of the nodes in one subtree, 

      you end up with lots of empty slots that you can't fill, right?

      Array is easy since these slots just slip to the left. 

      If nodes move left they are move left on same row.

      I don't get it. I don't see how you can preserve heap property with array structure

      while keeping shapre property just by shifting to left.

      Actually shape property is misleading. If you try to enforce it, with either array or tree

      You don't end up with good results. You have to keep rebalancing the whole tree,

      not just the subtree lineage you modified.

      So just find first free slot, left to right in array, BFS

      First free slot is FIRST NODE WITH THING == EMPTY

      or NEW NODE in FIRST NODE THAT HAS NON FULL CHILDREN

      It's not perfect (as in heap is always perfect balanced. But it's good enough.

      You still get heap property.
    */
    
    let maxDepth = -1;
    let firstNodeInRow;

    for( const {node, depth} of this.bfs() ) {
      if ( node.thing === Empty ) {
        // an empty node in the tree
        return node;
      } else if ( node.degree <  this.config.arity ) {
        // a node without a full complement of children
        const newLeaf = new Node({thing:Empty});
        node.addChild(newLeaf);
        return newLeaf;
      }

      if ( depth > maxDepth ) {
        firstNodeInRow = node;
      }
    }

    if ( firstNodeInRow ) {
      // all nodes are full and have values
      // so add a new leaf to a new row at the left
      const newLeaf = new Node({thing: Empty});
      firstNodeInRow.addChild(newLeaf);
      return newLeaf;
    } else {
      // the tree has no nodes so create the first node
      const newRoot = new Node({thing: Empty});
      this.setRoot(newRoot);
      return newRoot;
    }
  }

  // private methods
    *#bfsIterator() {
      const root = this.getRoot();

      if ( ! root ) return;

      const queue = [{node:root, depth:0}]; 

      while(queue.length) {
        const {node,depth} = queue.shift();
        queue.push(...node.children.map(child => ({node:child,depth:depth + 1})));
        yield {node,depth};
      }
    }

    *#dfsIterator() {
      const root = this.getRoot();

      if ( ! root ) return;

      const stack = [{node:root, depth:0}]; 

      while(stack.length) {
        const {node,depth} = stack.pop();
        stack.push(...node.children.reverse().map(childNode => ({node:childNode,depth:depth + 1})));
        yield {node,depth};
      }
    }
}

export class Node {
  // private fields
    // node children
    #children

  // API 
    constructor(opts) {
      const {children} = opts;
      this.parent = opts.parent;

      if ( Object.hasOwnProperty.call(opts, THING) ) {
        this.thing = opts.thing;
      } else {
        this.thing = Empty;
      }

      this.#children = [];

      if ( Array.isArray(children) ) {
        for( const child of children ) {
          this.addChild(child);
        }
      }
    }

    get degree() {
      return this.#children.length;
    }

    get children() {
      return this.#children;
    }

    set children(newChildren) {
      throw new TypeError(`Cannot set all children array. Use addChild instead.`);
    }

    addChild(newChild) {
      this.#children.push(newChild);
      newChild.parent = this;
    }

    deleteSubtree(child) {
      const children = this.#children;
      const index = children.indexOf(child);
      if ( index >= 0 ) {
        children.splice(index,1);
      }
    }
}

