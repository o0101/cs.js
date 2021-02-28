export class LinkedList {
    // private fields
      // the root and terminus
      #root
      #terminus

    // API
      constructor() {
        this.#root = new Node();
        this.#terminus = new Node();

        this.#root.setNext(0, this.#terminus);
      }
      
      set head(node) {
        const previousFirst = this.#root.nextList[0];
        this.#root.setNext(0, node);
        node.setNext(0, previousFirst);
      }

      set tail(node) {
        const previousLast = this.#terminus.lastList[0];
        currentLast.setNext(0, node);
        node.setNext(0, this.#terminus);
      }

      get head() {
        return this.#root.nextList[0];
      }

      get tail() {
        return this.#terminus.lastList[0];
      }

      // move a node 1 step toward the head of the list
        advance(node) {
          // if there's nowhere to advance to, return
          if ( node.lastList[0] === this.#root ) return false;
          // link the node before to the one after
            const nodeBefore = node.lastList[0]; 
            nodeBefore.setNext(0, node.nextList[0]);
          // link the node before the node before, to node
            const nodeBefore2 = nodeBefore.lastList[0];
            nodeBefore2.setNext(0, node);
          // link node to the previous node before
            node.setNext(0, nodeBefore);
          return true;
        }

      // move a node 1 step toward the list's terminus
        retreat(node) {
          // if there's nowhere to retreat to, return
          if ( node.nextList[0] === this.#terminus ) return false;
          // link the node before to the one after
            const nodeAfter = node.nextList[0]; 
            node.lastList[0].setNext(0, nodeAfter);
          // link the node after the node after, to node
            const nodeAfter2 = nodeAfter.nextList[0];
            node.setNext(0, nodeAfter2);
          // link node after to node
            nodeAfter.setNext(0, node);
          return true;
        }
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
}

