export default class LinkedList {
  // private fields
    // the root and terminus
    #root
    #terminus
    #length
    #sign

    // names for reverse
      // next last lists and functions
      #nextList
      #lastList
      #setNext
      #setLast
  
  // API
    constructor(data) {
      this.#root = new Node();
      this.#terminus = new Node();

      this.#root.setNext(0, this.#terminus);

      this.#length = 0;
      this.#sign = 1;

      this.#nextList = 'nextList';
      this.#lastList = 'lastList';
      this.#setNext = 'setNext';
      this.#setLast = 'setLast';

      if ( data !== undefined ) {
        for( const thing of data ) {
          this.push(thing);
        }
      }
    }

    get [Symbol.iterator]() {
      return linkedListIterator.bind(this);

      function *linkedListIterator() {
        let node = this.#root[this.#nextList][0];

        while( node !== this.#terminus ) {
          yield node;
          node = node[this.#nextList][0];
        }
      }
    }

    push(thing) {
      const node = new Node({thing});
      this.tail = node;
    }

    unshift(thing) {
      const node = new Node({thing});
      this.head = node;
    }

    pop() {
      const tail = this.tail;
      this.delete(this.tail);
      return tail.thing;
    }

    shift() {
      const head = this.head;
      this.delete(this.head);
      return head.thing;
    }

    set head(node) {
      const previousFirst = this.#root[this.#nextList][0];
      if ( previousFirst === node ) return;
      this.delete(node);
      this.#root[this.#setNext](0, node);
      node[this.#setNext](0, previousFirst);
      this.#length += 1;
    }

    set tail(node) {
      const previousLast = this.#terminus[this.#lastList][0];
      if ( previousLast === node ) return;
      this.delete(node);
      previousLast[this.#setNext](0, node);
      node[this.#setNext](0, this.#terminus);
      this.#length += 1;
    }

    get head() {
      return this.#root[this.#nextList][0];
    }

    get tail() {
      return this.#terminus[this.#lastList][0];
    }

    delete(node) {
      const nodeBefore = node[this.#lastList][0];
      const nodeAfter = node[this.#nextList][0];
      if ( nodeBefore ) {
        nodeBefore[this.#setNext](0, nodeAfter);
        this.#length -= 1;
      }
      return node;
    }

    get length() {
      return this.#length;
    }

    // move a node 1 step toward the head of the list
    advance(node) {
      // if there's nowhere to advance to, return
      if ( node[this.#lastList][0] === this.#root ) return false;
      // link the node before to the one after
        const nodeBefore = node[this.#lastList][0]; 
        nodeBefore[this.#setNext](0, node[this.#nextList][0]);
      // link the node before the node before, to node
        const nodeBefore2 = nodeBefore[this.#lastList][0];
        nodeBefore2[this.#setNext](0, node);
      // link node to the previous node before
        node[this.#setNext](0, nodeBefore);
      return true;
    }

    // move a node 1 step toward the list's terminus
    retreat(node) {
      // if there's nowhere to retreat to, return
      if ( node[this.#nextList][0] === this.#terminus ) return false;
      // link the node before to the one after
        const nodeAfter = node[this.#nextList][0]; 
        node[this.#lastList][0][this.#setNext](0, nodeAfter);
      // link the node after the node after, to node
        const nodeAfter2 = nodeAfter[this.#nextList][0];
        node[this.#setNext](0, nodeAfter2);
      // link node after to node
        nodeAfter[this.#setNext](0, node);
      return true;
    }

    reverse() {
      const V = [
        this.#nextList,
        this.#lastList,
        this.#setNext,
        this.#setLast,
        this.#root,
        this.#terminus
      ];

      this.#nextList = V[1];
      this.#lastList = V[0];
      this.#setNext = V[3];
      this.#setLast = V[2];
      this.#root = V[5];
      this.#terminus = V[4];

      this.#sign *= -1;
    }

    static get Node() {
      return Node;
    }
}

export const Class = LinkedList;

export function create(...args) {
  return new LinkedList(...args);
}

export class Node {
  // private fields
    // the lists of next and previous nodes 
    // in each of the linked lists this node is part of
    #nextList
    #lastList

  // API
    constructor({thing} = {}) {
      this.thing = thing;
      this.#nextList = [];
      this.#lastList = [];
    }

    get nextList() {
      // Array.from ? adding roughly doubles 
      // time required for skiplist operations
      return this.#nextList;
    }

    get lastList() {
      // Array.from ? adding roughly doubles 
      // time required for skiplist operations
      return this.#lastList;
    }

    set nextList(nothing) {
      throw new TypeError(`Cannot set successors for all lists, use setNext(i, node) instead.`);
    }

    setNext(i, node) {
      if ( node ) {
        node.#lastList[i] = this;
      }
      return this.#nextList[i] = node;
    }

    setLast(i, node) {
      if ( node ) {
        node.#nextList[i] = this;
      }
      return this.#lastList[i] = node;
    }
}

